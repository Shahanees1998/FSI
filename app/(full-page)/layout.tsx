import { Metadata } from "next";
import { APP_NAME, APP_PORTAL_NAME } from "@/lib/appBranding";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: APP_PORTAL_NAME,
    description: `Secure portal for ${APP_NAME} agents, carriers, and administrators.`,
    robots: { index: false, follow: false },
    openGraph: {
        type: "website",
        title: APP_PORTAL_NAME,
        description: `Secure portal for ${APP_NAME} agents, carriers, and administrators.`,
        ttl: 604800,
    },
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon.png", type: "image/png", sizes: "32x32" },
        ],
        apple: "/favicon.png",
    },
};

export default function MainLayout({ children }: MainLayoutProps) {
    return <div>{children}</div>;
}
