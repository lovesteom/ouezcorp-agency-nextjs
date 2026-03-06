import { MetadataRoute } from "next";
import { getAllServices, getAllRealisations, getAllPosts } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ouezcorp.com";

  // Static routes
  const routes = ["", "/services", "/realisations", "/blog", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    }),
  );

  // Dynamic routes
  const services = (await getAllServices()) || [];
  const servicesUrls = services.map((service: any) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const realisations = (await getAllRealisations()) || [];
  const realisationsUrls = realisations.map((realisation: any) => ({
    url: `${baseUrl}/realisations/${realisation.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const posts = (await getAllPosts()) || [];
  const postsUrls = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...servicesUrls, ...realisationsUrls, ...postsUrls];
}
