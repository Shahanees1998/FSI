"use client";

import Link from "next/link";
import { Accordion, AccordionTab } from "primereact/accordion";
import type { ProviderCarrierEntry } from "@/components/learn/contacts/providerContactsData";
import { PROVIDER_CARRIERS } from "@/components/learn/contacts/providerContactsData";

const link = "text-blue-600 font-medium no-underline hover:underline";

function CarrierBody({ entry }: { entry: ProviderCarrierEntry }) {
    if (entry.contacts?.length) {
        return (
            <div className="text-700 line-height-3 text-sm md:text-base">
                {entry.contacts.map((c, i) => (
                    <div key={i} className="mb-3 last:mb-0 pb-3 last:pb-0 border-bottom-1 surface-border last:border-none">
                        <strong className="text-900">{c.name}</strong>
                        {c.role ? <span className="text-600"> — {c.role}</span> : null}
                        <div className="mt-1">
                            {c.phone ? (
                                <>
                                    <span className="text-600">Phone: </span>
                                    <a href={`tel:${c.phone.replace(/\D/g, "")}`} className={link}>
                                        {c.phone}
                                    </a>
                                    {c.email ? <span className="text-600"> | </span> : null}
                                </>
                            ) : null}
                            {c.email ? (
                                <>
                                    <span className="text-600">Email: </span>
                                    <a href={`mailto:${c.email}`} className={link}>
                                        {c.email}
                                    </a>
                                </>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    return (
        <p className="text-700 line-height-3 m-0 text-sm md:text-base">
            Direct phone and email for this carrier will be listed here when head office publishes the full directory. For
            contracting and commission questions, use Experior&apos;s internal departments first so your request is tracked and
            handled promptly.
        </p>
    );
}

export default function ProviderContactsView() {
    return (
        <div className="surface-card border-round border-1 surface-border overflow-hidden">
            <div className="p-4 md:p-5 lg:p-6" style={{ maxWidth: "52rem" }}>
                <h1 className="text-2xl md:text-3xl font-bold text-900 m-0 mb-3">US Carrier and Partner Contacts</h1>
                <p className="text-700 line-height-3 m-0 mb-4 text-sm md:text-base">
                    Please route <strong>contracting</strong> and <strong>commission</strong> questions through Experior&apos;s
                    internal teams whenever possible. That keeps work assigned correctly and usually gets you a faster answer than
                    calling carriers directly.
                </p>
                <div className="mb-4">
                    <Link
                        href="/agent/learn/about-experior/contacts/experior-contacts"
                        className="inline-flex align-items-center justify-content-center px-4 py-2 border-round font-semibold text-white no-underline shadow-2 hover:opacity-90 transition-duration-150"
                        style={{ background: "#2563eb" }}
                    >
                        Experior Head Office Directory
                    </Link>
                </div>

                <Accordion multiple activeIndex={[0]} className="provider-contacts-accordion">
                    {PROVIDER_CARRIERS.map((entry, i) => (
                        <AccordionTab key={i} header={entry.header}>
                            <CarrierBody entry={entry} />
                        </AccordionTab>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
