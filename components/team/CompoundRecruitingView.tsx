"use client";

import RecruitingYoutubeEmbed from "@/components/team/RecruitingYoutubeEmbed";

const DEFAULT_VIDEO_ID = process.env.NEXT_PUBLIC_COMPOUND_RECRUITING_VIDEO_ID?.trim() || "dQw4w9WgXcQ";

export default function CompoundRecruitingView() {
    return (
        <div className="p-4 md:p-5">
            <h2 className="text-xl font-semibold text-900 mt-0 mb-2">Compound Recruiting</h2>
            <p className="text-600 line-height-3 m-0 mb-4">
                Build depth in your organization by helping associates recruit their own teams. Use these resources
                when presenting the compound recruiting model to prospects and new agents.
            </p>
            <RecruitingYoutubeEmbed videoId={DEFAULT_VIDEO_ID} title="Compound recruiting overview" />
        </div>
    );
}
