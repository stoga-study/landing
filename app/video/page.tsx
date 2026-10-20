import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { APP_URL } from "@/components/links";
import { UpdatesVideo } from "@/components/UpdatesVideo";

const TITLE = "Every update since launch, in one minute";
const DESCRIPTION = "A 60-second look at Stoga.study versions 1.1 to 1.9: study sets, the hint-first tutor, plans around real CHS test dates, study groups, privacy and more.";

export const metadata: Metadata = {
  title: "Updates video",
  description: DESCRIPTION,
  alternates: { canonical: "/video" },
  openGraph: {
    type: "video.other",
    url: "https://stoga.study/video",
    siteName: "Stoga.study",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    videos: [{ url: "https://stoga.study/video/stoga-updates-16x9.mp4", secureUrl: "https://stoga.study/video/stoga-updates-16x9.mp4", type: "video/mp4", width: 1920, height: 1080 }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function VideoPage() {
  return (
    <>
      <Header />
      <main id="main" className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Versions 1.1 to 1.9 · Made for Conestoga</span>
            <h1 className="page-title">Every update since launch, in one minute.</h1>
            <p>Nine updates in one month, from choosing what gets made from each file to an ideas board students vote on. Every screen in the video is the real app.</p>
          </div>
          <UpdatesVideo />
          <div className="uv-cta">
            <p>Free for every Conestoga student.</p>
            <a className="btn btn-primary btn-lg" href={APP_URL}>Open the app</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
