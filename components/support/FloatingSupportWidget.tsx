"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useToast } from "@/store/toast.context";

export default function FloatingSupportWidget() {
    const { showToast } = useToast();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitting, setSubmitting] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                panelRef.current &&
                !panelRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const handleSubmit = async () => {
        const trimmedName = form.name.trim();
        const trimmedEmail = form.email.trim();
        const trimmedMessage = form.message.trim();

        if (!trimmedName) {
            showToast("warn", "Support", "Please enter your name.");
            return;
        }

        if (!trimmedEmail) {
            showToast("warn", "Support", "Please enter your email.");
            return;
        }

        if (!trimmedMessage) {
            showToast("warn", "Support", "Please enter a message.");
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch("/api/support/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: trimmedName,
                    email: trimmedEmail,
                    message: trimmedMessage,
                }),
            });

            const payload = await response.json();

            if (!response.ok) {
                showToast(
                    "error",
                    "Support",
                    payload.message || payload.error || "Unable to send your message."
                );
                return;
            }

            showToast("success", "Support", payload.message || "Your message was received.");
            setForm({ name: "", email: "", message: "" });
            setOpen(false);
        } catch {
            showToast("error", "Support", "Unable to reach support. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="floating-support-widget">
            {open && (
                <div ref={panelRef} className="floating-support-panel surface-card border-round shadow-4 p-3">
                    <div className="font-semibold text-900 mb-1">Contact support</div>
                    <p className="text-600 text-sm mt-0 mb-3 line-height-3">
                        Send us a message and we&apos;ll get back to you.
                    </p>
                    <label htmlFor="support-name" className="block text-sm font-medium mb-2">
                        Name
                    </label>
                    <InputText
                        id="support-name"
                        className="w-full mb-3"
                        value={form.name}
                        placeholder="Your name"
                        disabled={submitting}
                        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <label htmlFor="support-email" className="block text-sm font-medium mb-2">
                        Email
                    </label>
                    <InputText
                        id="support-email"
                        type="email"
                        className="w-full mb-3"
                        value={form.email}
                        placeholder="you@example.com"
                        disabled={submitting}
                        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    />
                    <label htmlFor="support-message" className="block text-sm font-medium mb-2">
                        Message
                    </label>
                    <InputTextarea
                        id="support-message"
                        className="w-full mb-3"
                        rows={4}
                        value={form.message}
                        placeholder="How can we help?"
                        disabled={submitting}
                        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    />
                    <Button
                        label="Submit"
                        className="w-full"
                        loading={submitting}
                        onClick={() => void handleSubmit()}
                    />
                </div>
            )}

            <button
                ref={buttonRef}
                type="button"
                className="floating-support-button"
                aria-label="Contact support"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
            >
                <svg
                    className="floating-support-button-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                >
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
            </button>
        </div>
    );
}
