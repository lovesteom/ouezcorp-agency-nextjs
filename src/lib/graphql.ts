export const QUERY_ALL_SERVICES = `
  query GetAllServices {
    services {
      nodes {
        id
        slug
        title
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const QUERY_SERVICE_BY_SLUG = `
  query GetServiceBySlug($id: ID!, $idType: ServiceIdType!) {
    service(id: $id, idType: $idType) {
      id
      slug
      title
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      seo {
        title
        metaDesc
      }
    }
  }
`;

export const QUERY_ALL_REALISATIONS = `
  query GetAllRealisations {
    realisations {
      nodes {
        id
        slug
        title
        content
        realisationsFields {
          client
          stackTechnique
          galerie {
            nodes {
              sourceUrl
              altText
            }
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const QUERY_REALISATION_BY_SLUG = `
  query GetRealisationBySlug($id: ID!, $idType: RealisationIdType!) {
    realisation(id: $id, idType: $idType) {
      id
      slug
      title
      content
      realisationsFields {
        client
        stackTechnique
        galerie {
          nodes {
            sourceUrl
            altText
          }
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      seo {
        title
        metaDesc
      }
    }
  }
`;

export const QUERY_ALL_POSTS = `
  query GetAllPosts {
    posts {
      nodes {
        id
        slug
        title
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const QUERY_POST_BY_SLUG = `
  query GetPostBySlug($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
      id
      slug
      title
      content
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      seo {
        title
        metaDesc
      }
    }
  }
`;
