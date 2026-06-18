import { requireCurrentUser } from "@/lib/serverAuth";
import { renderRecruitingCmsPage } from "@/lib/recruitingCmsPage";

const WHY_CHOOSE_EXPERIOR_CORPORATE_URL = "https://www.youtube.com/watch?v=zOXvHy9kPfw";

export default async function WhyChooseExperiorCorporateVideoPage() {
    await requireCurrentUser("AGENT");
    return renderRecruitingCmsPage(
        "why-choose-experior-corporate-video",
        "Why Choose Experior Corporate Video",
        undefined,
        WHY_CHOOSE_EXPERIOR_CORPORATE_URL
    );
}
