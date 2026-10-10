import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { View } from "@react-three/drei";
import FitCamera from "./FitCamera.tsx";
import { brandColor } from "../../styling/palette.ts";

const COLUMNS = 22;
const ROWS = 9;
const GAP = 0.32;
const CAMERA_DIRECTION: [number, number, number] = [0, 0.65, 1];
const CAMERA_TARGET: [number, number, number] = [0, 0.5, 0];

// A field of equalizer bars that ripple like a spectrum analyzer and swell toward the cursor.
const EqualizerHero = () => (
    <View className="absolute inset-0">
        <FitCamera width={COLUMNS * GAP + 1.2} height={4} direction={CAMERA_DIRECTION} target={CAMERA_TARGET} fov={40} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 6, 3]} intensity={1.8} />
        <pointLight position={[-4, 2, -1]} intensity={12} color={brandColor("ambers")} />
        <Bars />
    </View>
);

const Bars = () => {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const pointer = useRef(new THREE.Vector2(0, 0));
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // the canvas ignores pointer events, so follow the cursor at the window level
    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
    }, []);

    // color ramp across the field: lush -> ambers -> nguni, with hazy at the back rows
    useEffect(() => {
        if (!mesh.current) return;
        const front = [brandColor("lush"), brandColor("ambers"), brandColor("nguni")].map((c) => new THREE.Color(c));
        const back = new THREE.Color(brandColor("hazy"));
        const color = new THREE.Color();
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                const t = col / (COLUMNS - 1);
                const [a, b, k] = t < 0.5 ? [front[0], front[1], t * 2] : [front[1], front[2], (t - 0.5) * 2];
                color.copy(a).lerp(b, k).lerp(back, (row / (ROWS - 1)) * 0.6);
                mesh.current.setColorAt(row * COLUMNS + col, color);
            }
        }
        mesh.current.instanceColor!.needsUpdate = true;
        // recompile in case the shader was built before instance colors existed
        (mesh.current.material as THREE.Material).needsUpdate = true;
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;
        const time = state.clock.elapsedTime;
        const pointerX = pointer.current.x * (COLUMNS * GAP) / 2;
        const pointerZ = pointer.current.y * (ROWS * GAP) / 2;

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                const x = (col - (COLUMNS - 1) / 2) * GAP;
                const z = (row - (ROWS - 1) / 2) * GAP;
                const wave = Math.sin(col * 0.45 + time * 2.2) * Math.cos(row * 0.6 + time * 1.4);
                const beat = Math.max(0, Math.sin(time * 4 - col * 0.25)) ** 6;
                const near = Math.exp(-((x - pointerX) ** 2 + (z - pointerZ) ** 2) * 0.8);
                const height = 0.15 + (wave + 1) * 0.35 + beat * 0.4 + near * 1.4;

                dummy.position.set(x, height / 2, z);
                dummy.scale.set(1, height, 1);
                dummy.updateMatrix();
                mesh.current.setMatrixAt(row * COLUMNS + col, dummy.matrix);
            }
        }
        mesh.current.instanceMatrix.needsUpdate = true;
        mesh.current.rotation.y = Math.sin(time * 0.15) * 0.25;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, COLUMNS * ROWS]}>
            <boxGeometry args={[GAP * 0.72, 1, GAP * 0.72]} />
            <meshStandardMaterial roughness={0.35} metalness={0.2} />
        </instancedMesh>
    );
};
export default EqualizerHero;
