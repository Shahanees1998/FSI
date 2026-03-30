import { Poppins } from "next/font/google";
import { ClientProviders } from "./ClientProviders";

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "../styles/globals.scss";
import "../styles/layout/layout.scss";
import "../styles/theme.css";
import "../styles/font-poppins.css";

const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-poppins",
});

export const metadata = {
    title: "Freedom Shield Insurance Portal",
    description: "Back-office platform for Freedom Shield Insurance agents, carriers, and administrators.",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${poppins.variable} ${poppins.className}`}
        >
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/images/logo.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <ClientProviders>{children}</ClientProviders>
            </body>
        </html>
    );
}
