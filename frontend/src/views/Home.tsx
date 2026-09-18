import { useCallback, useEffect, useState } from "react";
import { DrumPad, HeaderTools, Footer, CustomUI } from "../components/index.ts";

export default function Home() {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-start gap-4 px-4">
            <HeaderTools />

            <Overview />
            <ProductsShowcase />

            <Footer />
        </main >
    );
};
const Overview = () => (
    <section className="flex flex-col md:flex-row md:items-stretch w-full md:h-64 gap-1">

        {/* about us, i want the viewer to have a quick brief when they enter */}
        <div className="w-full md:w-[30%] flex flex-col h-full text-left gap-3">
            <h1 className="text-lg md:text-3xl">Creating fun digital and physical music gear.</h1>
            <p className="text-xs md:text-sm">
                At Earjar, our mission is simple. Bring back the weird and retro aesthetic of music gear.
                We're a startup based in Cape Town South Africa, trying to bring that idea to life.
            </p>
            <div className="flex items-center justify-start gap-2 text-xs md:text-sm">
                <h1 className="text-umnyama">Reach out:</h1>
                <a href="mailto:earjaraudio@gmail.com" className="text-umnyama w-fit flex items-center justify-start gap-1 text-xs hover:scale-102">
                    <img src="/images/gmail.png" className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/144578070" className="text-umnyama w-fit flex items-center justify-start gap-1 text-xs hover:scale-102">
                    <img src="/images/linkedin.png" className="w-5 h-5" />
                </a>
            </div>
        </div>
        
        {/* images */}
        <div className="w-full md:w-[70%] h-full bg-[url('/images/synth-live.jpg')] bg-cover bg-center bg-no-repeat rounded-md">
            <div className="bg-nguni/40 w-full h-full rounded-md" />
        </div>
    </section>
);

type BrowserGear = {
    id: string;
    carouselIndex: number;
    title: string;
    reactNode: React.ReactNode;
};
const ProductsShowcase = () => {
    const [browserGearIdx, setBrowserGearIdx] = useState<number>(0);
    const browserGear: BrowserGear[] = [
        { id: "drum-pad", title: "Jam Pod", carouselIndex: 0, reactNode: <DrumPad /> }
    ];

    const nextBrowserGearIdx = useCallback(() => {
        const nextIdx = browserGearIdx + 1;
        if (nextIdx >= browserGear.length) {
            return setBrowserGearIdx(0);
        }
        setBrowserGearIdx(nextIdx);
    }, []);
    const prevBrowserGearIdx = useCallback(() => {
        const nextIdx = browserGearIdx - 1;
        if (nextIdx < 0) {
            return setBrowserGearIdx(0);
        }
        setBrowserGearIdx(nextIdx);
    }, []);

    useEffect(() => {
        setBrowserGearIdx(0);
    }, []);

    return (
        <section className="w-full flex-1 flex flex-col items-start justify-center gap-14">
            {/* browser gear */}
            <HomeProductWrapper title="Playable Browser Demos" summary="These are built on top of our Audio Engine (Typescript) library">
                <div className="w-full flex-1 flex items-center justify-between h-50">
                    <button onClick={prevBrowserGearIdx}><img src="/images/right-arrow.png" className="w-8 h-8 md:w-15 md:h-15 rotate-y-180" /></button>

                    {browserGear.map((item: BrowserGear) => {
                        if (item.carouselIndex !== browserGearIdx) return null;
                        return (
                            <div key={item.id} className="flex flex-col items-center gap-6 px-2 w-full">
                                <div className="flex items-center justify-center gap-4">
                                    <div className="p-1 flex flex-col gap-2">
                                        <CustomUI.SubHeader title={item.title} />
                                        {item.reactNode}
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    <button onClick={nextBrowserGearIdx} className=""><img src="/images/right-arrow.png" className="w-8 h-8 md:w-15 md:h-15" /></button>
                </div>
            </HomeProductWrapper>

            {/* vst gear */}
            <HomeProductWrapper title="VST's" summary="Windows & MAC Compatible digital gear">
            </HomeProductWrapper>

            {/* physical products */}
            <HomeProductWrapper title="Hardware" summary="Synthesizers and Music Gear">
            </HomeProductWrapper>

        </section>
    );
};
const HomeProductWrapper: React.FC<{ title: string, summary: string, children?: React.ReactNode }> = ({ title, summary, children }) => (
    <div className="flex flex-col items-start gap-2 w-full bg-bone/20 border border-ash/20 px-4 py-2 rounded-sm">
        <div className="flex flex-col gap-1">
            <CustomUI.MainHeaderDark title={title} />
            <CustomUI.SubHeader title={summary} />
        </div>
        <div className="flex items-center justify-center gap-2 w-full p-2">
            {children ? children : <CustomUI.NoInformation title="Products to be announced soon :)" />}
        </div>
    </div>
);