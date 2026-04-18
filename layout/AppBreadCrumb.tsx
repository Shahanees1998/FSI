import type { AppBreadcrumbProps } from "@/types/index";
import { APP_NAME } from "@/lib/appBranding";
import { usePathname } from "next/navigation";

const formatSegment = (segment: string) =>
    segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

const AppBreadcrumb = ({ className }: AppBreadcrumbProps) => {
    const pathname = usePathname();
    const parts = pathname.split("/").filter(Boolean);

    return (
        <div className={className}>
            <nav className="layout-breadcrumb">
                <ol>
                    {parts.length === 0 ? (
                        <li>{APP_NAME}</li>
                    ) : (
                        parts.map((part, index) => (
                            <li key={`${part}-${index}`}>
                                {index > 0 ? " / " : ""}
                                {formatSegment(part)}
                            </li>
                        ))
                    )}
                </ol>
            </nav>
        </div>
    );
};

export default AppBreadcrumb;
