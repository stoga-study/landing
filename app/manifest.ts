import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stoga.study",
    short_name: "Stoga",
    description: "The free study app made for Conestoga High School.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F6F5",
    theme_color: "#720D19",
    icons: [{ src: "/icon.png", sizes: "240x240", type: "image/png" }],
  };
}
