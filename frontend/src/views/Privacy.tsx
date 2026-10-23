import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { HeaderTools, Footer, CustomUI } from "../components/index.ts";
import { COMPANY, LEGAL_LAST_UPDATED } from "../constants/company.ts";

/*
 * Earjar's privacy policy, written against POPIA (Protection of Personal
 * Information Act 4 of 2013).
 *
 * The claims below are deliberately matched to what the code actually does:
 * there is no analytics, no cookie, no localStorage and no form anywhere in
 * src/, so "we collect nothing" is true of the site itself. The two honest
 * exceptions are the hosting provider's request logs and the Google Fonts
 * import in index.css, and both are disclosed rather than glossed over - an
 * inaccurate POPIA notice is worse than a modest one.
 *
 * If you add accounts, a shop, analytics or a contact form, clauses 2 to 6
 * stop being true and must be rewritten.
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

const clauses: Clause[] = [
    {
        heading: "Who we are",
        body: `${COMPANY.legalName} (registration number ${COMPANY.registrationNumber}), a company registered in ${COMPANY.country}, is the responsible party for any personal information processed through this website, in the sense POPIA gives that term. Our Information Officer can be reached at the address in the last clause below.`,
    },
    {
        heading: "The short version",
        body: "We do not collect your personal information. This site has no accounts, no sign-up, no login, no contact form, no newsletter and no comments. It runs no analytics, no advertising and no tracking pixels, and it sets no cookies. We do not build a profile of you, and we hold nothing about you to sell, share or lose.",
    },
    {
        heading: "What our hosting provider sees",
        body: "The one honest exception. Showing you a web page means your browser has to ask a server for it, and that request is visible to the company hosting this site. Our host may keep short-lived technical logs containing:",
        bullets: [
            "The IP address the request came from",
            "The browser and operating system making the request",
            "The date and time of the request, and which page was asked for",
            "The page that referred you, if you arrived by following a link",
        ],
    },
    {
        heading: "Why we may hold those logs",
        body: "Request logs of this kind exist to keep the site online: diagnosing faults, understanding load, and blocking abuse or attack. We rely on legitimate interests under section 11(1)(f) of POPIA for this, rather than on your consent, because the site cannot be served securely without it. We do not use these logs to identify you, we do not combine them with anything else, we do not use them for marketing, and we do not sell them. They are kept no longer than our host's own retention period.",
    },
    {
        heading: "Typefaces loaded from Google",
        body: "This site loads three typefaces from the Google Fonts service, so your browser makes a request to Google each time a page loads. Your IP address is visible to Google as part of that request, under Google's privacy policy rather than this one. We receive nothing back from Google, and we deliberately send nothing identifying you. A browser extension that blocks third-party font requests will prevent it, and we may self-host these fonts in future to remove the third party altogether.",
    },
    {
        heading: "Cookies and browser storage",
        body: "We set no cookies. We write nothing to your browser's local storage or session storage, and we leave nothing on your device that outlives your visit. There is no cookie banner here because there is nothing to consent to and nothing to opt out of.",
    },
    {
        heading: "If you email us",
        body: `If you write to us at ${COMPANY.email}, we will hold whatever you choose to put in that message, including your email address. That mailbox is hosted by Google. We keep correspondence only as long as we need it to deal with what you asked about, and we will never add you to a mailing list on the strength of an email you sent us.`,
    },
    {
        heading: "Links to other places",
        body: "Our pages link out to GitHub, LinkedIn and npm. Following one of those links takes you to a service we neither own nor control, with its own privacy policy and its own tracking. This policy stops at the edge of this site.",
    },
    {
        heading: "Information leaving South Africa",
        body: "Section 72 of POPIA governs personal information sent outside the country. Our hosting and content delivery infrastructure, and the font service described above, may sit outside South Africa, so the technical request data in clauses 3 and 5 may be processed abroad by providers subject to protections comparable to POPIA. Nothing else leaves the country, because nothing else is gathered in the first place.",
    },
    {
        heading: "Your rights under POPIA",
        body: "POPIA gives you rights over your own personal information, and you may exercise any of them free of charge by emailing us. In practice, because we hold nothing that identifies you, an access request will usually come back empty - but you are fully entitled to ask, and we will answer. You may:",
        bullets: [
            "Ask what personal information we hold about you, and who we have given it to, under section 23",
            "Ask us to correct or delete information that is inaccurate, irrelevant, excessive, out of date, misleading or unlawfully obtained, under section 24",
            "Object to our processing of your personal information, under section 11(3)",
            "Withdraw your consent, in the event we ever come to rely on consent for anything",
            "Complain to the Information Regulator, as set out in the next clause",
        ],
    },
    {
        heading: "Complaints",
        body: "If you are unhappy with how we have handled your personal information, please raise it with us first - it is usually the quickest way to get the problem fixed. You are also entitled to take it straight to the Information Regulator, the body that enforces POPIA in South Africa.",
        /*
         * Sources disagree on the Regulator's current head office: its own site
         * gives Woodmead North Office Park, while older notices still list JD
         * House in Braamfontein. Confirm on inforegulator.org.za before launch.
         */
        extra: (
            <div className="flex flex-col gap-1 text-sm text-umnyama/80 leading-relaxed">
                <p>The Information Regulator (South Africa):</p>
                <p>
                    <a href="mailto:POPIAComplaints@inforegulator.org.za" className={CustomUI.legalLinkClass}>
                        POPIAComplaints@inforegulator.org.za
                    </a>
                </p>
                <p>
                    <a href="mailto:enquiries@inforegulator.org.za" className={CustomUI.legalLinkClass}>
                        enquiries@inforegulator.org.za
                    </a>
                    {" or 010 023 5200"}
                </p>
                <p>Woodmead North Office Park, 54 Maxwell Drive, Woodmead, Johannesburg, 2191</p>
                <p>
                    <a
                        href="https://inforegulator.org.za"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={CustomUI.legalLinkClass}
                    >
                        inforegulator.org.za
                    </a>
                </p>
            </div>
        ),
    },
    {
        heading: "Children",
        body: "This site is not directed at children, and we do not knowingly collect personal information about anyone, of any age.",
    },
    {
        heading: "Changes to this policy",
        body: "We will update this policy as the site grows. Adding accounts, a shop, a contact form or analytics would each make parts of it untrue, and we will rewrite it before shipping any of those rather than after. The date shown at the top of this page tells you which version you are reading.",
    },
    {
        heading: "How to contact us",
        body: "Any question about this policy, about your rights, or anything here you would like us to explain:",
        extra: (
            <p className="text-sm text-umnyama/80 leading-relaxed">
                <a href={`mailto:${COMPANY.email}`} className={CustomUI.legalLinkClass}>
                    {COMPANY.email}
                </a>
                {` - marked for the attention of the Information Officer, ${COMPANY.legalName}.`}
            </p>
        ),
    },
];

export default function Privacy() {
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
                    <CustomUI.MainHeaderDark title="Privacy Policy" />
                    <CustomUI.NoInformation title={`Last updated: ${LEGAL_LAST_UPDATED}`} />
                </motion.div>

                <CustomUI.DarkSeperator />

                <p className="text-sm text-umnyama/80 leading-relaxed">
                    Short version first: we do not collect anything about you. The rest of this page
                    explains what that means in practice, what our hosting provider can still see, and
                    what POPIA entitles you to ask of us.
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
