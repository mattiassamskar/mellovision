export interface Vote {
  key?: string;
  user: string;
  artist: string;
  music: number;
  performance: number;
  clothes: number;
}

export interface UserComment {
  key?: string;
  user: string;
  comment: string;
  imageUrl: string;
}
