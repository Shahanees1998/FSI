import { requireCurrentUser } from "@/lib/serverAuth";
import { redirect } from "next/navigation";

/** Team → Recruiting → Why Choose Experior (Spanish subtitles): YouTube video. */
const WHY_CHOOSE_EXPERIOR_SPANISH_URL = "https://www.youtube.com/watch?v=SoGwY1KqDBc";

export default async function WhyChooseExperiorSpanishSubtitlesPage() {
    await requireCurrentUser("AGENT");
    redirect(WHY_CHOOSE_EXPERIOR_SPANISH_URL);
}

