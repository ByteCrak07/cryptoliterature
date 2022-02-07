interface UserProfile {
  full_name?: string;
  user_name: string;
  email?: string;
  profile_id: string;
  img_url: string;
  wallet_key: string;
  following: number;
  followers: number;
  buymeacoffee_link?: string;
  bio?: string;
  instagram?: {
    id: string;
    link: string;
    verified: boolean;
  };
  twitter?: {
    id: string;
    link: string;
    verified: boolean;
  };
  facebook?: {
    id: string;
    link: string;
    verified: boolean;
  };

  joined_on: string;
}

export type { UserProfile };
