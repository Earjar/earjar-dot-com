import { HeaderTools, Footer, Plugins } from "../components/index.ts";

export default function Shop() {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-start gap-4 px-4">
            <HeaderTools />

            <section className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 items-start gap-6 py-8">
                <div className="relative w-full flex flex-col items-start gap-4">
                    <Plugins.PluginsShopSection />
                </div>
            </section>

            <Footer />
        </main>
    );
};