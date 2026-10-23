/*
 * Single source of truth for Earjar's identity details.
 *
 * These values appear in the footer and in both legal pages, and some of them
 * (legal name, registration number, contact address) are disclosures that the
 * Electronic Communications and Transactions Act expects a South African
 * supplier to publish. Keeping them in one place stops the three copies from
 * drifting apart.
 */

type Company = {
    legalName: string;
    registrationNumber: string;
    /** Empty until Earjar is VAT registered. The legal copy keys off this. */
    vatNumber: string;
    email: string;
    foundedYear: number;
    country: string;
};

export const COMPANY: Company = {
    legalName: "Earjar (Pty) Ltd",
    registrationNumber: "2026/843471/07",
    vatNumber: "",
    email: "earjaraudio@gmail.com",
    foundedYear: 2025,
    country: "South Africa",
};

/** Shown on the privacy policy and terms. Bump when wording changes materially. */
export const LEGAL_LAST_UPDATED = "23 October 2026";
