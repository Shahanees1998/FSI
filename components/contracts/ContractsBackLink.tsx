import Link from "next/link";

const linkClass = "text-blue-600 font-medium no-underline hover:underline text-sm";

export default function ContractsBackLink() {
    return (
        <p className="m-0 mb-3">
            <Link href="/agent/contracts" className={linkClass}>
                ← Contracts
            </Link>
        </p>
    );
}
