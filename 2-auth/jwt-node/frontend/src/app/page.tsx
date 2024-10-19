"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Post } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [featured, setFeatured] = useState<Post[]>([]);

  useEffect(() => {
    async function getFeaturedPosts() {
      try {
        // const posts = await fetchFeaturedPosts();
        setFeatured([]);
      } catch (error) {
        console.error("Failed to fetch featured posts:", error);
      }
    }

    getFeaturedPosts();
  }, []);

  return (
    <div>
      This is the home page, all users can see this.
      <div className="mt-10">
        <h2 className="font-bold text-xl">Featured</h2>

        <Separator className="my-4" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {featured.map((post: Post) => (
            <Link key={post.title} href={`/post/${post.id}`} className="flex">
              <Card
                key={post.title}
                className="py-2 px-4 flex flex-col justify-between hover:bg-gray-50 cursor-pointer"
              >
                <div>
                  <p className="text-xs text-gray-500 pb-2">@{post.username}</p>
                  <h3 className="font-bold">{post.title}</h3>
                  <p className="text-sm text-gray-700">{post.description}</p>
                </div>
                <div className="pt-3">
                  <p className="text-xs text-gray-600">
                    {post.likes} likes, {post.dislikes} dislikes
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
