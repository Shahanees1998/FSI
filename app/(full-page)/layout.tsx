import { Metadata } from "next";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "Freedom Shield Insurance Portal",
    description:
        "Secure portal for Freedom Shield Insurance agents, carriers, and administrators.",
    robots: { index: false, follow: false },
    openGraph: {
        type: "website",
        title: "Freedom Shield Insurance Portal",
        url: "https://www.freedomshieldinsurance.com",
        description:
            "Secure portal for Freedom Shield Insurance agents, carriers, and administrators.",
        images: ["/images/logo.png"],
        ttl: 604800,
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon.png", type: "image/png", sizes: "32x32" },
        ],
        apple: "/images/logo.png",
    },
};

export default function MainLayout({ children }: MainLayoutProps) {
    return <div>{children}</div>;
}
