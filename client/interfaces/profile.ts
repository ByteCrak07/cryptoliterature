interface UserProfile {
  name: string;
  profile_name: string;
  profile_id: string;
  img_url: string;
  wallet_key: string;
  following: number;
  followers: number;
  buymeacoffee_link: string;
  bio: string;
  social_media: {
    instagram: {
      id: string;
      link: string;
    };
    twitter: {
      id: string;
      link: string;
    };
    facebook: {
      id: string;
      link: string;
    };
  };
  joined_on: string;
}

export type { UserProfile };
