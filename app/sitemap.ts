import type { MetadataRoute } from "next";
import projects from "@/data/projects.json";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/skills", "/projects", "/research", "/dashboard-lab", "/how-i-work", "/insights", "/resume", "/contact"];
  return [
    ...pages.map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date() })),
    ...projects.map((project) => ({ url: `${baseUrl}/projects/${project.slug}`, lastModified: new Date() })),
  ];
}
