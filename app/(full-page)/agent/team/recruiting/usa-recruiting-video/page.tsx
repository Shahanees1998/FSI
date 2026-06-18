import UsaRecruitingVideoView from "@/components/team/UsaRecruitingVideoView";
import { requireCurrentUser } from "@/lib/serverAuth";
import { renderRecruitingCmsPage } from "@/lib/recruitingCmsPage";

export default async function UsaRecruitingVideoPage() {
    await requireCurrentUser("AGENT");
    return renderRecruitingCmsPage(
        "usa-recruiting-video",
        "USA Recruiting Video",
        (
            <div className="surface-card border-round border-1 surface-border overflow-hidden p-0 w-full max-w-full bg-white">
                <div className="surface-100 border-bottom-1 surface-border px-3 py-2 md:px-4">
                    <p className="text-600 text-sm m-0">Team / Recruiting / USA Recruiting Video</p>
                </div>
                <UsaRecruitingVideoView />
            </div>
        )
    );
}
