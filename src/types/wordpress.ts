export interface WordPressImage {
  sourceUrl: string;
  altText: string;
}

export interface SeoMeta {
  title: string;
  metaDesc: string;
  opengraphTitle: string;
  opengraphDescription: string;
  opengraphImage: WordPressImage;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: WordPressImage;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  content: string; // Assuming 'description' is content
  featuredImage: {
    node: WordPressImage;
  };
  seo: SeoMeta;
}

export interface Realisation {
  id: string;
  slug: string;
  title: string;
  content: string; // Assuming 'résultat' is content
  realisationsFields: {
    stackTechnique: string;
    client: string;
    galerie: {
      nodes: WordPressImage[];
    };
  };
  featuredImage: {
    node: WordPressImage;
  };
  seo: SeoMeta;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: {
    node: {
      name: string;
      avatar: {
        url: string;
      };
    };
  };
  featuredImage: {
    node: WordPressImage;
  };
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  seo: SeoMeta;
}
