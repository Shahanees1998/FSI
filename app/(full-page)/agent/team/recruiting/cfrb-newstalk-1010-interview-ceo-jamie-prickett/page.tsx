import { requireCurrentUser } from "@/lib/serverAuth";
import { redirect } from "next/navigation";

/** Team → Recruiting → CFRB Newstalk: opens Newstalk 1010 audio / podcasts. */
const CFRB_NEWTALK_AUDIO_URL = "https://www.newstalk1010.com/audio.html";

export default async function CfrbNewstalkRecruitingPage() {
    await requireCurrentUser("AGENT");
    redirect(CFRB_NEWTALK_AUDIO_URL);
}
