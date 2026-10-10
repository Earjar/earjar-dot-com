import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

type FitCameraProps = {
    // world-space width that must stay visible, whatever the shape of the view
    width: number;
    // world-space height that must stay visible
    height: number;
    // direction the camera looks from, relative to the target
    direction: [number, number, number];
    target?: [number, number, number];
    fov?: number;
};

// A camera that backs off along `direction` until a width x height area fits inside the view,
// so scenes stay framed on both wide desktop panels and narrow phone screens.
const FitCamera: React.FC<FitCameraProps> = ({ width, height, direction, target = [0, 0, 0], fov = 35 }) => {
    const camera = useRef<THREE.PerspectiveCamera>(null);
    const size = useThree((state) => state.size);

    useLayoutEffect(() => {
        if (!camera.current || !size.width || !size.height) return;
        const aspect = size.width / size.height;
        const halfFov = THREE.MathUtils.degToRad(fov / 2);
        const distance = Math.max(height / 2 / Math.tan(halfFov), width / 2 / (Math.tan(halfFov) * aspect));

        const offset = new THREE.Vector3(...direction).normalize().multiplyScalar(distance);
        camera.current.position.set(target[0] + offset.x, target[1] + offset.y, target[2] + offset.z);
        camera.current.lookAt(...target);
    }, [size.width, size.height, width, height, fov, direction, target]);

    return <PerspectiveCamera ref={camera} makeDefault fov={fov} />;
};
export default FitCamera;
