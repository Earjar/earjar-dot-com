import "../../styling/main-background.css";
import { AudioWaveCursor } from "../index.ts";

const ParentWrapper: React.FC<any> = ({ children }) => (
    <div className="video-layout noise relative min-h-screen bg-chalk/80 text-umnyama w-full py-6">
        <AudioWaveCursor />
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 lg:px-2">
            {children}
        </div>
    </div>
);
export default ParentWrapper;