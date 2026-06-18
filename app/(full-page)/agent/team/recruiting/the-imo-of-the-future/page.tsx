import ImoOfTheFutureView from "@/components/team/ImoOfTheFutureView";
import { requireCurrentUser } from "@/lib/serverAuth";
import { renderRecruitingCmsPage } from "@/lib/recruitingCmsPage";

export default async function ImoOfTheFuturePage() {
    await requireCurrentUser("AGENT");
    return renderRecruitingCmsPage(
        "the-imo-of-the-future",
        "The IMO of the Future",
        (
            <div className="surface-card border-round border-1 surface-border overflow-hidden p-0 w-full max-w-full bg-white">
                <div className="surface-100 border-bottom-1 surface-border px-3 py-2 md:px-4">
                    <p className="text-600 text-sm m-0">Team / Recruiting / The IMO of the Future</p>
                </div>
                <ImoOfTheFutureView />
            </div>
        )
    );
}
