interface UserProfile {
  id: number;
  walletKey: string;
  username: string;
  fullName?: string;
  email?: string;
  imgUrl: string;
  following: number;
  followers: number;
  donationUrl?: string;
  bio?: string;
  instaId?: string;
  instaLink?: string;
  instaVerified: boolean;
  twitterId?: string;
  twitterLink?: string;
  twitterVerified: boolean;
  facebookId?: string;
  facebookLink?: string;
  facebookVerified: boolean;
  isWriter: boolean;
  isCollector: boolean;
  createdAt: Date;
}

export type { UserProfile };
