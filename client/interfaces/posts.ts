interface PostData {
  published_on: number;
  title: string;
  excerpt: string;
  slug: string;
  feature_image?: string;
  feature_image_alt?: string;
  type: string;
  genre: Array<string>;
  content: string;
  author: { profile_id: number; profile_image?: string; name?: string };
  published: boolean;
  archived: boolean;
}

interface GhostPost {
  title: string;
  excerpt: string;
  custom_excerpt: string;
  slug: string;
  html: string;
  feature_image?: string;
  feature_image_alt?: string;
  featured: boolean;
  primary_author: { profile_image?: string; name?: string };
  published_at: string;
  reading_time: number;
  meta_title: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
}

export type { PostData, GhostPost };
