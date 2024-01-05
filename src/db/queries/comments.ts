import type { Comment } from "@prisma/client";
import { db } from "@/db";
import { cache } from "react";

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

/* with the addition of cache, we can call this function as many times as we want and in as many
components as we want that as long as the arguments are identical, call will be deduplicated ->
the function will only be executed one single time as long as the arguments are the same.*/
export const fetchCommentsByPostId = cache(
  (postId: string): Promise<CommentWithAuthor[]> => {
    return db.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
    });
  }
);
