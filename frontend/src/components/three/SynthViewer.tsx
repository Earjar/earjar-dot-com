import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, View } from "@react-three/drei";
import FitCamera from "./FitCamera.tsx";
import SynthModel from "./SynthModel.tsx";
import { brandColor, type BrandColor } from "../../styling/palette.ts";

type SynthViewerProps = {
    url: string;
    accent: BrandColor;
    // the section the viewer lives in; its scroll position drives the model's rotation
    sectionRef: React.RefObject<HTMLElement | null>;
};

// looking down at the front panel, slightly from above
const CAMERA_DIRECTION: [number, number, number] = [0, 0.55, 1];
const CAMERA_TARGET: [number, number, number] = [0, 0.25, 0];

const SynthViewer: React.FC<SynthViewerProps> = ({ url, accent, sectionRef }) => {
    const dragRef = useRef({ active: false, lastX: 0, offset: 0 });

    // horizontal drag spins the model; touch-action pan-y keeps vertical page scrolling working on mobile
    const onPointerDown = (e: React.PointerEvent) => {
        dragRef.current.active = true;
        dragRef.current.lastX = e.clientX;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: React.PointerEvent) => {
        if (!dragRef.current.active) return;
        dragRef.current.offset += (e.clientX - dragRef.current.lastX) * 0.01;
        dragRef.current.lastX = e.clientX;
    };
    const onPointerUp = () => { dragRef.current.active = false; };

    return (
        <div
            className="relative w-full h-full cursor-grab active:cursor-grabbing"
            style={{ touchAction: "pan-y" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
        >
            <View className="absolute inset-0">
                <FitCamera width={3.9} height={2.4} direction={CAMERA_DIRECTION} target={CAMERA_TARGET} />
                <SynthStage accent={accent} sectionRef={sectionRef} dragRef={dragRef}>
                    <Suspense fallback={<LoadingBox accent={accent} />}>
                        <SynthModel url={url} />
                    </Suspense>
                </SynthStage>
            </View>
        </div>
    );
};

type SynthStageProps = {
    accent: BrandColor;
    sectionRef: React.RefObject<HTMLElement | null>;
    dragRef: React.RefObject<{ offset: number }>;
    children: React.ReactNode;
};
const SynthStage: React.FC<SynthStageProps> = ({ accent, sectionRef, dragRef, children }) => {
    const turntable = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        const group = turntable.current;
        const section = sectionRef.current;
        if (!group || !section) return;

        // 0 when the section enters from the bottom of the viewport, 1 when it leaves through the top
        const rect = section.getBoundingClientRect();
        const viewport = window.innerHeight;
        const progress = THREE.MathUtils.clamp((viewport - rect.top) / (viewport + rect.height), 0, 1);

        const targetY = THREE.MathUtils.lerp(-0.9, 0.9, progress) + dragRef.current.offset;
        const targetX = THREE.MathUtils.lerp(0.25, -0.1, progress);
        group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, 6, delta);
        group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 6, delta);
        group.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
    });

    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 5, 2]} intensity={1.6} />
            <pointLight position={[-3, 1.5, -2]} intensity={8} color={brandColor(accent)} />
            {/* studio lighting built from local light panels, so no HDR file has to be downloaded */}
            <Environment resolution={256}>
                <Lightformer intensity={2} position={[0, 4, 0]} rotation-x={Math.PI / 2} scale={[8, 8, 1]} />
                <Lightformer intensity={1.2} position={[-4, 1, 2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
                <Lightformer intensity={1.5} position={[4, 1, 2]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} color={brandColor("bone")} />
            </Environment>

            <group ref={turntable}>{children}</group>

            <ContactShadows position={[0, -0.01, 0]} opacity={0.45} scale={8} blur={2.4} far={2} color={brandColor("umnyama")} />
        </>
    );
};

const LoadingBox: React.FC<{ accent: BrandColor }> = ({ accent }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((_, delta) => {
        if (ref.current) ref.current.rotation.y += delta;
    });
    return (
        <mesh ref={ref} position={[0, 0.3, 0]}>
            <boxGeometry args={[2.4, 0.4, 1.4]} />
            <meshBasicMaterial color={brandColor(accent)} wireframe />
        </mesh>
    );
};

export default SynthViewer;
