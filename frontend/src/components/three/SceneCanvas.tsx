import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

// A single WebGL canvas fixed behind the page. Every <View> on the page renders into it,
// so we only pay for one GL context no matter how many synth models are shown.
const SceneCanvas = () => (
    <Canvas
        className="!fixed inset-0 !pointer-events-none"
        style={{ position: "fixed", inset: 0, zIndex: 0 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
    >
        <View.Port />
    </Canvas>
);
export default SceneCanvas;
