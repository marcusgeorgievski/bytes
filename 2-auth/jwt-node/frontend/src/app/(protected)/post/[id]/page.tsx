"use client";

import { Separator } from "@/components/ui/separator";
import { Post } from "@/lib/types";
import { useEffect, useState } from "react";

export default function PostPage({ params }: { params: { id: number } }) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params.id}`, {
      cache: "no-store",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [params.id]);

  if (!post?.id) return <div>No Post found</div>;

  return (
    <div className="flex flex-col items-center justify-start mt-10">
      <div className="w-fit">
        <p className="text-sm text-gray-500 mb-4">@{post.username}</p>
        <h2 className="font-bold text-xl mb-2">{post.title}</h2>
        <p>{post.description}</p>
        <div className="flex gap-2 items-center mt-4">
          <p className="text-sm text-gray-500">{post.likes} likes</p>
          <Separator className="h-4" orientation="vertical" />
          <p className="text-sm text-gray-500">{post.likes} dislikes</p>
        </div>
      </div>
    </div>
  );
}
