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
    <section className="flex flex-col md:flex-row md:items-stretch w-full md:h-72">
        {/* about us, i want the viewer to have a quick brief when they enter */}
        <div className="w-full md:w-[30%] flex flex-col h-full">
            <div className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-ambers">
                <h1 className="text-lg md:text-4xl">Creating fun digital <br></br>and physical music gear.</h1>
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-2 px-4 py-2 bg-bone h-full">
                <p className="text-xs md:text-sm">At Earjar, our mission is simple. Bring back the weird and retro aesthetic of music gear.</p>
                <p className="text-xs md:text-sm">We're a startup based in Cape Town South Africa, trying to bring that idea to life.</p>
            </div>
        </div>
        {/* contacting us */}
        <div className="w-full md:w-[70%] bg-[url('/images/synth-live.jpg')] bg-cover bg-center bg-no-repeat h-full">
            <div className="w-full flex flex-col items-center justify-center gap-2 px-4 py-2 bg-nguni/60 h-full">
                <h1 className="text-md text-bone">Want to join the team?</h1>
                <div className="flex items-center justify-center gap-2">
                    <a href="mailto:earjaraudio@gmail.com" className="text-bone w-fit flex items-center justify-start gap-1 text-xs py-1 px-1 rounded-sm hover:scale-102">
                        Reach out to us
                        <img src="/images/gmail.png" className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/company/144578070" className="text-bone w-fit flex items-center justify-start gap-1 text-xs py-1 px-1 rounded-sm hover:scale-102">
                        Message us
                        <img src="/images/linkedin.png" className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </div>
    </section>
);
const ProductsShowcase = () => (
    <section className="w-full flex-1 flex flex-col items-start justify-center gap-14">
        {/* browser gear */}
        <div className="flex flex-col items-start gap-2 w-full bg-bone/20 p-2">
            <div className="flex flex-col gap-1">
                <CustomUI.MainHeaderDark title="Playable Browser Demos" />
                <CustomUI.SubHeader title="These can be played right now" />
            </div>
            <div className="flex items-start gap-2 w-full p-2">
                <div className="flex flex-col items-center gap-6 px-2 w-full">
                    <div className="flex items-center justify-center gap-4">
                        <div className="p-1 flex flex-col gap-2">
                            <CustomUI.SubHeader title="Browser Jam Pod" />
                            <DrumPad />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* vst gear */}
        <div className="flex flex-col items-start gap-2 w-full bg-bone/20 p-2">
            <div className="flex flex-col gap-1">
                <CustomUI.MainHeaderDark title="VST's" />
                <CustomUI.SubHeader title="Windows & MAC Compatible digital gear" />
            </div>
            <div className="flex flex-col items-center gap-6 px-2 w-full">
                <div className="flex items-center justify-center gap-4">
                    <CustomUI.NoInformation title="Products to be announced soon :)" />
                </div>
            </div>
        </div>

        {/* physical products */}
        <div className="flex flex-col items-start gap-2 w-full bg-bone/20 p-2">
            <div className="flex flex-col gap-1">
                <CustomUI.MainHeaderDark title="Hardware" />
                <CustomUI.SubHeader title="Synthesizers and Music Gear" />
            </div>
            <div className="flex flex-col items-center gap-6 px-2 w-full">
                <div className="flex items-center justify-center gap-4">
                    <CustomUI.NoInformation title="Products to be announced soon :)" />
                </div>
            </div>
        </div>

        {/* open source software */}
        <div className="flex flex-col items-start gap-2 w-full bg-bone/20 p-2">
            <div className="flex flex-col gap-1">
                <CustomUI.MainHeaderDark title="Audio Software: For Developers" />
                <CustomUI.SubHeader title="Libraries, presets, etc." />
            </div>
            <div className="flex flex-col items-center gap-6 px-2 w-full">
                <div className="flex items-center justify-center gap-4">
                    <CustomUI.NoInformation title="Products to be announced soon :)" />
                </div>
            </div>
        </div>

    </section>
);