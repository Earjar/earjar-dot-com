import { HeaderTools, Footer, PluginsHomeSection } from "../components/index.ts";

export default function Home() {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-start gap-4 px-4">
            <HeaderTools />

            <section className="w-full min-h-screen items-start gap-2 py-2 overflow-x-auto">
                <PluginsHomeSection />
            </section>

            <Footer />
        </main>
    );
};