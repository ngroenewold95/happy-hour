import CommentCreateForm from "@/components/comments/comment-create-form";
import {
  CommentWithAuthor,
  fetchCommentsByLocationId,
} from "@/db/queries/comments";
import Image from "next/image";

interface CommentShowProps {
  commentId: string;
  locationId: string;
}

export default async function CommentShow({
  commentId,
  locationId,
}: CommentShowProps) {
  const comments = await fetchCommentsByLocationId(locationId);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return (
      <CommentShow
        key={child.id}
        commentId={child.id}
        locationId={locationId}
      />
    );
  });

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>

          <CommentCreateForm
            locationId={comment.locationId}
            parentId={comment.id}
          />
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  );
}
