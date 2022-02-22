import { UserProfile } from "./profile";

interface PostDataShort {
  id: number;
  title: string;
  type: string;
  slug: string;
  author: { username: string; fullName?: string; imgUrl: string };
  publishedOn?: Date;
  createdAt: Date;
}

interface CreatePostData {
  title: string;
  type: string;
  genre: Array<string>;
}

interface PostData {
  id: number;
  title: string;
  type: string;
  genre: Array<string>;
  slug: string;
  excerpt?: string;
  featureImage?: string;
  featureImageAlt?: string;
  content?: string;
  author: UserProfile;
  authorWalletKey?: string;
  published: boolean;
  archived: boolean;
  createdAt?: Date;
  publishedOn?: Date;
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

export type { PostDataShort, CreatePostData, PostData, GhostPost };
