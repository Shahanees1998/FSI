import { requireCurrentUser } from "@/lib/serverAuth";
import { redirect } from "next/navigation";

/** Team → Recruiting → Why Choose Experior: corporate YouTube video. */
const WHY_CHOOSE_EXPERIOR_CORPORATE_URL = "https://www.youtube.com/watch?v=zOXvHy9kPfw";

export default async function WhyChooseExperiorCorporateVideoPage() {
    await requireCurrentUser("AGENT");
    redirect(WHY_CHOOSE_EXPERIOR_CORPORATE_URL);
}

