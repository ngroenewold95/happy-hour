import CommentShow from "@/components/comments/comment-show";
import { fetchCommentsByLocationId } from "@/db/queries/comments";

interface CommentListProps {
  locationId: string;
}

export default async function CommentList({ locationId }: CommentListProps) {
  const comments = await fetchCommentsByLocationId(locationId);
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        locationId={locationId}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
