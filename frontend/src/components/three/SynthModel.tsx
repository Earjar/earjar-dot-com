import { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

type SynthModelProps = {
    url: string;
    // size of the model's longest side in world units, so every synth renders at a similar scale
    size?: number;
};

// Loads a .glb and normalizes it: centered on the origin, resting on y = 0, scaled to `size`.
const SynthModel: React.FC<SynthModelProps> = ({ url, size = 3 }) => {
    const { scene } = useGLTF(url);

    const { object, scale, offset } = useMemo(() => {
        const object = scene.clone(true);
        object.traverse((child) => {
            if (!(child as THREE.Mesh).isMesh) return;
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            // Sketchfab exports often flag opaque bodies as BLEND, which breaks depth sorting on a single mesh
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((material) => { material.depthWrite = true; });
        });

        const box = new THREE.Box3().setFromObject(object);
        const dimensions = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const scale = size / Math.max(dimensions.x, dimensions.y, dimensions.z);
        const offset = new THREE.Vector3(-center.x, -box.min.y, -center.z).multiplyScalar(scale);
        return { object, scale, offset };
    }, [scene, size]);

    return (
        <group position={offset} scale={scale}>
            <primitive object={object} />
        </group>
    );
};
export default SynthModel;
