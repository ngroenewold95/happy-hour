import { db } from "@/db";
import type { Comment } from "@prisma/client";

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

export function fetchCommentsByLocationId(
  locationId: string
): Promise<CommentWithAuthor[]> {
  return db.comment.findMany({
    where: { locationId },
    include: {
      user: { select: { name: true, image: true } },
    },
  });
}
