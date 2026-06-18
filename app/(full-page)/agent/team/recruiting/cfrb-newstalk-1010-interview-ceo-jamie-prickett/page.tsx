import { requireCurrentUser } from "@/lib/serverAuth";
import { renderRecruitingCmsPage } from "@/lib/recruitingCmsPage";

const CFRB_NEWTALK_AUDIO_URL = "https://www.newstalk1010.com/audio.html";

export default async function CfrbNewstalkRecruitingPage() {
    await requireCurrentUser("AGENT");
    return renderRecruitingCmsPage(
        "cfrb-newstalk-1010-interview-ceo-jamie-prickett",
        "CFRB Newstalk 1010 Interview with CEO, Jamie Prickett",
        undefined,
        CFRB_NEWTALK_AUDIO_URL
    );
}
