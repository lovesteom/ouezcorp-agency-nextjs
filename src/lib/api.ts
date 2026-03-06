const API_URL =
  process.env.WORDPRESS_API_URL || "https://your-wordpress-site.com/graphql";

async function fetchAPI(query: string, variables: any = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers["Authorization"] =
      `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
    // Revalidation config: Use ISR settings from user prompt: revalidate often
    next: { revalidate: 60 },
  }).catch((err) => {
    console.warn(
      "API fetch failed, returning empty data. Check WORDPRESS_API_URL.",
      err.message,
    );
    return null;
  });

  if (!res) {
    return {};
  }

  if (!res.ok) {
    console.error("Failed to fetch API", await res.text());
    return {};
  }

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    // Instead of throwing, return null/empty to allow build to proceed with empty content
    console.warn("GraphQL Errors:", json.errors);
    return {};
  }
  return json.data;
}

export async function getAllServices() {
  const data = await fetchAPI(
    `
    query GetAllServices {
      services {
        nodes {
          slug
          title
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `,
  );
  return data?.services?.nodes;
}

export async function getServiceBySlug(slug: string) {
  const data = await fetchAPI(
    `
    query GetServiceBySlug($id: ID!, $idType: ServiceIdType!) {
      service(id: $id, idType: $idType) {
        title
        content
        slug
        seo {
          fullHead
        }
      }
    }
  `,
    {
      variables: { id: slug, idType: "SLUG" },
    },
  );
  return data?.service;
}

export async function getAllRealisations() {
  const data = await fetchAPI(
    `
      query GetAllRealisations {
        realisations {
          nodes {
            slug
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `,
  );
  return data?.realisations?.nodes;
}

export async function getRealisationBySlug(slug: string) {
  const data = await fetchAPI(
    `
      query GetRealisationBySlug($id: ID!, $idType: RealisationIdType!) {
        realisation(id: $id, idType: $idType) {
          title
          content
          slug
          seo {
            fullHead
          }
        }
      }
    `,
    {
      variables: { id: slug, idType: "SLUG" },
    },
  );
  return data?.realisation;
}

export async function getAllPosts() {
  const data = await fetchAPI(
    `
      query GetAllPosts {
        posts {
          nodes {
            slug
            title
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    `,
  );
  return data?.posts?.nodes;
}

export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(
    `
      query GetPostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          title
          content
          slug
          seo {
            fullHead
          }
        }
      }
    `,
    {
      variables: { id: slug, idType: "SLUG" },
    },
  );
  return data?.post;
}
