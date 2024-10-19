//
export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

export type Post = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  username?: string;
  likes?: number;
  dislikes?: number;
};

export type Like = {
  id: number;
  user_id: number;
  post_id: number;
  created_at: Date;
};

export type Dislike = {
  id: number;
  user_id: number;
  post_id: number;
  created_at: Date;
};

// Optional: You might want to create types for inserting new records
// These types won't include auto-generated fields like 'id' and timestamps
export type NewUser = Omit<User, "id" | "created_at" | "updated_at">;

export type NewPost = Omit<Post, "id" | "created_at" | "updated_at">;

export type NewLike = Omit<Like, "id" | "created_at">;

export type NewDislike = Omit<Dislike, "id" | "created_at">;
