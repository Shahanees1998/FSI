import { requireCurrentUser } from "@/lib/serverAuth";
import { renderRecruitingCmsPage } from "@/lib/recruitingCmsPage";

const WHY_CHOOSE_EXPERIOR_SPANISH_URL = "https://www.youtube.com/watch?v=SoGwY1KqDBc";

export default async function WhyChooseExperiorSpanishSubtitlesPage() {
    await requireCurrentUser("AGENT");
    return renderRecruitingCmsPage(
        "why-choose-experior-spanish-subtitles",
        "Why Choose Experior | Spanish Subtitles",
        undefined,
        WHY_CHOOSE_EXPERIOR_SPANISH_URL
    );
}
