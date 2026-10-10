import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://stoga.study/", changeFrequency: "weekly", priority: 1 },
    { url: "https://stoga.study/privacy", changeFrequency: "monthly", priority: 0.4 },
    { url: "https://stoga.study/plans", changeFrequency: "monthly", priority: 0.6 },
    { url: "https://stoga.study/faq", changeFrequency: "monthly", priority: 0.6 },
  ];
}
