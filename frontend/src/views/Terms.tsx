import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { HeaderTools, Footer, CustomUI } from "../components/index.ts";
import { COMPANY, LEGAL_LAST_UPDATED } from "../constants/company.ts";

/*
 * Earjar's terms of use.
 *
 * Written for the site as it actually is today: a showcase. There is no cart,
 * no payment and no order code anywhere in src/, so these terms say plainly
 * that no sale is concluded here and that any price shown is indicative. That
 * also keeps the site clear of most of section 43 of the ECT Act, which bites
 * on suppliers who actually transact electronically.
 *
 * Before taking a single payment you will need to add: a physical address and
 * website URL (ECTA s43 disclosures this file deliberately omits), a payment
 * and security description, and real delivery/returns terms. Clause 12 is the
 * placeholder that points at that work.
 *
 * The liability clause is written to stay inside sections 48 and 51 of the
 * Consumer Protection Act, which is why the carve-out list exists - a blanket
 * exclusion is the thing most likely to be struck down.
 *
 * Not legal advice. Worth having a qualified reader check before launch.
 */

type Clause = {
    heading: string;
    body?: string;
    bullets?: string[];
    /** For clauses that need markup, such as an inline link. */
    extra?: ReactNode;
};

const vatPosition = COMPANY.vatNumber
    ? `Prices include VAT at the applicable rate. Our VAT number is ${COMPANY.vatNumber}.`
    : "We are not currently registered for VAT, so no VAT is added to the prices shown.";

const clauses: Clause[] = [
    {
        heading: "Who you are dealing with",
        body: "This website is operated by:",
        bullets: [
            `${COMPANY.legalName}, a private company registered in ${COMPANY.country}`,
            `Registration number ${COMPANY.registrationNumber}`,
            `Contact address: ${COMPANY.email}`,
            "What we make: software instruments and audio tools, with hardware instruments planned",
        ],
    },
    {
        heading: "Accepting these terms",
        body: "By browsing this site you accept these terms. If you do not accept them, please stop using the site. We have tried to write them in plain language rather than the usual wall of capital letters, and nothing in them is intended to take away a right the law gives you.",
    },
    {
        heading: "What this site is",
        body: "This is a showcase for what Earjar is building. It is not a shop. You cannot place an order, pay, or conclude any contract of sale through this site, and nothing here is an offer capable of acceptance. If and when we start selling directly, we will publish separate sale terms covering payment, delivery and returns before you are able to buy anything.",
    },
    {
        heading: "Prices shown here",
        body: `Any price on this site is indicative only, is quoted in South African Rand, and may change at any time without notice. ${vatPosition} A price shown here does not oblige us to sell at that price, and specifications or availability of anything described may change as development continues.`,
    },
    {
        heading: "Acceptable use",
        body: "Use the site as it was meant to be used. You may not:",
        bullets: [
            "Attempt to break into, overload, disrupt or probe the site or the servers behind it",
            "Scrape it, or access it in bulk by automated means, without our written permission",
            "Reverse-engineer any part of it, beyond what South African law expressly permits",
            "Copy or reuse our audio, artwork, designs or branding without permission",
            "Use the site for anything unlawful, or to infringe anyone else's rights",
        ],
    },
    {
        heading: "Sound output and your hearing",
        body: "Parts of this site play audio, including the drum pads and the synth interface. How loud that actually comes out depends on your own device, operating system, amplifier and headphones, none of which we control. Please turn your volume down before you start, and be especially careful with headphones and in-ear monitors. Protect your hearing: it does not grow back, and we cannot be responsible for damage caused by the volume you choose to set.",
    },
    {
        heading: "Our intellectual property",
        body: "The Earjar name and logo, the design and layout of this site, its interface, its artwork, the audio it plays and the designs of the instruments shown on it belong to us or are used with permission. You are welcome to browse the site, link to it, and refer to it for your own personal, non-commercial purposes. You may not republish, resell or redistribute our material, or present it as your own.",
    },
    {
        heading: "Our open-source code",
        body: "Some of our work is published openly, for example on GitHub and as packages under the @earjar scope on npm. Anything published that way is governed by the licence that accompanies it, and that licence prevails over this clause for that code. Nothing in these terms narrows a right an open-source licence has already given you.",
    },
    {
        heading: "Links to other sites",
        body: "We link out to GitHub, LinkedIn and npm. Those services are not ours, we do not control what they publish or how they treat your data, and a link from us is not an endorsement. Once you follow one, their terms apply instead of ours.",
    },
    {
        heading: "Availability and changes",
        body: "This site is provided as it is and as it happens to be available. Earjar is an early-stage company and this site is actively being built, so we do not promise that it will be uninterrupted, error-free, or that any feature will keep working or continue to exist. We may change, suspend or withdraw any part of it at any time.",
    },
    {
        heading: "Limitation of liability",
        body: "To the fullest extent the law allows, we are not liable for indirect or consequential loss arising from your use of this site - for example lost profit, lost data, lost time or business interruption. There are, however, limits on what any business may exclude, and we do not attempt to exclude:",
        bullets: [
            "Liability for death or personal injury caused by our negligence",
            "Liability for our own gross negligence, fraud or deliberate misconduct",
            "Liability for harm caused by unsafe or defective goods under section 61 of the Consumer Protection Act",
            "Any other liability that South African law does not permit us to exclude or limit",
        ],
    },
    {
        heading: "If and when we start selling",
        body: "When direct sales open, separate terms will set out ordering, payment, security, delivery and returns, and will give you the protections the Consumer Protection Act and the ECT Act require. Worth knowing in advance: the seven-day cooling-off right for electronic transactions under section 44 of the ECT Act does not extend to computer software once it has been downloaded or unsealed, so our software terms will explain what we do offer in its place.",
    },
    {
        heading: "Your responsibility to us",
        body: "If you use this site unlawfully or in breach of these terms and that causes us loss, or causes a third party to bring a claim against us, you are responsible for that loss or claim. This is limited to what actually results from your own conduct.",
    },
    {
        heading: "Changes to these terms",
        body: "We may update these terms as the site and the company develop. The date shown at the top of this page tells you which version is currently in force, and continuing to use the site after a change means you accept the updated version.",
    },
    {
        heading: "Governing law",
        body: "These terms are governed by the law of South Africa, and the South African courts have jurisdiction over any dispute arising from them or from your use of this site. If you are a consumer, nothing here affects the rights the Consumer Protection Act or the ECT Act gives you, or your right to complain to the National Consumer Commission.",
    },
    {
        heading: "Severability",
        body: "If any part of these terms turns out to be unenforceable, that part is treated as removed and the rest continues to apply.",
    },
    {
        heading: "How to contact us",
        body: "Questions about these terms, or anything on this site:",
        extra: (
            <p className="text-sm text-umnyama/80 leading-relaxed">
                <a href={`mailto:${COMPANY.email}`} className={CustomUI.legalLinkClass}>
                    {COMPANY.email}
                </a>
                {` - ${COMPANY.legalName}, registration number ${COMPANY.registrationNumber}.`}
            </p>
        ),
    },
];

export default function Terms() {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-start gap-4 px-4">
            <HeaderTools />

            <section className="w-full max-w-3xl flex flex-col gap-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-2"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-nguni">Legal</span>
                    <CustomUI.MainHeader title="Terms of Use" />
                    <CustomUI.NoInformation title={`Last updated: ${LEGAL_LAST_UPDATED}`} />
                </motion.div>

                <CustomUI.DarkSeperator />

                <p className="text-sm text-umnyama/80 leading-relaxed">
                    These terms cover browsing this site. It is a showcase rather than a shop, so there
                    is nothing to buy here yet and nothing you can agree to pay for. The clauses worth
                    reading properly are the one about sound output and the one about liability.
                </p>

                <div className="flex flex-col gap-6">
                    {clauses.map((clause, index) => (
                        <CustomUI.LegalClause
                            key={clause.heading}
                            index={index + 1}
                            heading={clause.heading}
                            body={clause.body}
                            bullets={clause.bullets}
                        >
                            {clause.extra}
                        </CustomUI.LegalClause>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
};
