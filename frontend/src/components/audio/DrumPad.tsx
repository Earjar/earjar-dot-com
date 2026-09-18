import "./drum-pad.css";
import { useAudioEngine } from "@earjar/audio-engine-ts";
import { motion, AnimatePresence } from "framer-motion";
import { CircleQuestionMark, Ear, Power } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Drums = {
    id: string;
    label: string;
    icon: React.ReactNode;
    sound: string;
};
const imageIcon = (src: string) => (
    <img src={src} className="w-6 h-6" />
);
const clamp = (num: number, min: number, max: number): number =>
    Math.min(Math.max(num, min), max);

const DrumPad = () => {
    const jamAudioRef = useRef<HTMLDivElement>(null);
    const drumPadRefs: any[] = [];

    const { isPlayingTrack, playTrack, pauseTrack, playOneShot } = useAudioEngine();
    const [open, setOpen] = useState<boolean>(false);
    const toggleOpen = () => setOpen(!open);
    const [pan, setPan] = useState<number>(0);

    const drums: Drums[] = [
        { label: "Kick", icon: imageIcon("/images/drum-kit/kick.png"), sound: "/audio/drum-kit/kick.wav", id: "kick" },
        { label: "Snare", icon: imageIcon("/images/drum-kit/snare.png"), sound: "/audio/drum-kit/snare.wav", id: "snare" },
        { label: "Hi-Hat", icon: imageIcon("/images/drum-kit/hi-hat.png"), sound: "/audio/drum-kit/hi-hat.wav", id: "hi-hat" }
    ];
    const mapDrumKeysDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'a':
                // handleDrumKeyClick('snare');
                break;
            case 's':
                // handleDrumKeyClick('kick');
                break;
            case 'd':
                // handleDrumKeyClick('hi-hat')
                break;
            default:
                break;
        }
    };

    const togglePan = useCallback((val: number) => {
        const clampedVal = clamp(pan + val, -1, 1);
        setPan(clampedVal);
    }, [pan]);

    useEffect(() => {
        document.addEventListener('keydown', mapDrumKeysDown);
        return () => {
            document.removeEventListener('keydown', mapDrumKeysDown);
        };
    }, []);

    return (
        <div className="relative">
            <button
                className="absolute top-0 right-0 z-20 w-4 h-4 bg-nguni text-bone rounded-full"
                onClick={toggleOpen}
            >
                <CircleQuestionMark size={16} />
            </button>
            <DrumPadControlsInfo open={open} />

            {/* drum pad interface */}
            <div className={`hinge-panel ${open ? 'hinge-open' : 'hinge-closed'} relative z-10 flex flex-col items-center justify-center gap-2 p-2 bg-indigo_bloom border border-umnyama shadow-sm shadow-umnyama rounded-t-sm rounded-b-2xl`}>
                {/* jam audio play */}
                <div className="w-full flex flex-col items-center gap-2 text-bone" ref={jamAudioRef} >
                    {/* jam button */}
                    <div
                        className="flex items-center justify-between gap-2 bg-indigo_bloom border border-umnyama/20 shadow-xs shadow-umnyama/40 p-[2px] rounded-lg border w-full"
                    >
                        <button
                            onClick={isPlayingTrack ? () => pauseTrack() : () => playTrack("/audio/backing-tracks/song-4.mp3", { pan: pan })}
                            className={`cursor-pointer hover:scale-102 border border-umnyama ${isPlayingTrack ? 'shadow-none' : 'shadow-sm'} shadow-umnyama rounded-lg p-2 text-xs`}
                        >
                            {isPlayingTrack ? <Power size={16} color="lightgreen" /> : <Power size={16} color="white" />}
                        </button>

                        <div className="text-right w-full px-2">
                            <p className="text-xs text-bone/70">Jam Pod</p>
                            <p className="text-[8px] text-bone/50">demo by Earjar</p>
                        </div>

                        {/* effects */}
                        <div className="flex flex-col items-start gap-1 p-1">
                            {/* pan meter */}
                            <div className="flex items-center gap-1">
                                <span className="text-[9px]">Pan</span>
                                <div className="flex items-center justify-center h-1 w-15 bg-bone/50">
                                    <div
                                        className="bg-ambers"
                                        style={{
                                            height: "100%",
                                            width: "33%",
                                            transform: `translate(${pan * 100}%)`
                                        }} />
                                </div>
                            </div>
                            {/* pan buttons */}
                            <div className="flex items-center justify-end gap-1 w-full">
                                <button
                                    onClick={() => togglePan(-0.2)}
                                    className="bg-bone/30 text-bone border border-khala shadow-xs shadow-umnyama/40 p-[2px] rounded-lg text-xs cursor-grab hover:shadow-umnyama hover:scale-102 transition-all duration-100"
                                >
                                    L
                                    <div className="rotate-y-180">
                                        <Ear size={14} />
                                    </div>
                                </button>
                                <button
                                    onClick={() => togglePan(0.2)}
                                    className="bg-bone/30 text-bone border border-khala shadow-xs shadow-umnyama/40 p-[2px] rounded-lg text-xs cursor-grab hover:shadow-umnyama hover:scale-102 transition-all duration-100"
                                >
                                    R
                                    <div>
                                        <Ear size={14} />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* drum pad grid */}
                <div className="flex items-center justify-start gap-2 w-full">
                    {drums.map((drum: Drums) => {
                        const currDrumRef = useRef<HTMLDivElement>(null);
                        if (currDrumRef) {
                            drumPadRefs.push(currDrumRef);
                        }
                        return (
                            <div ref={currDrumRef}>
                                <button
                                    onClick={() => playOneShot(drum.sound)}
                                    key={drum.label}
                                    className="bg-bone/30 text-bone border border-khala shadow-xs shadow-umnyama/40 p-[2px] rounded-lg text-xs cursor-grab hover:shadow-umnyama hover:scale-102 transition-all duration-100"
                                >
                                    <div className="flex flex-col items-center gap-2 bg-bone/60 text-khala border border-khala p-2 rounded-lg">
                                        <span>{drum.icon}</span>
                                    </div>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
export default DrumPad;
const DrumPadControlsInfo: React.FC<{ open: boolean }> = ({ open }) => {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="drum-pad-ctrls"
                    className={`absolute top-0 right-0`}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 2,
                        ease: [0, 0.71, 0.2, 1.01],
                        opacity: { ease: "linear" }
                    }}
                >
                    {open && <div className="hidden" />}
                    <div className="hidden md:block rounded-b-2xl">
                        <img src="/images/JamWithMeControls.png" className="w-full h-full" />
                    </div>
                    <div className="block md:hidden rounded-b-2xl border px-2 py-1">
                        <p className="text-md">This feature is only available on desktop :(</p>
                    </div>
                </motion.div >
            )}

        </AnimatePresence>
    );
};