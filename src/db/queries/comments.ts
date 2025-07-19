import { db } from "@/db";
import type { Comment } from "@prisma/client";
import { cache } from "react";

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

export const fetchCommentsByLocationId = cache(
  (locationId: string): Promise<CommentWithAuthor[]> => {
    return db.comment.findMany({
      where: { locationId },
      include: {
        user: { select: { name: true, image: true } },
      },
    });
  }
);
