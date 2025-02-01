import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import LocationShow from "@/components/locations/location-show";
import { fetchCommentsByLocationId } from "@/db/queries/comments";
import paths from "@/paths";
import Link from "next/link";

interface LocationShowPageProps {
  params: Promise<{
    slug: string;
    locationId: string;
  }>;
}

export default async function LocationShowPage({
  params,
}: LocationShowPageProps) {
  const { slug, locationId } = await params;

  return (
    <div className="space-y-3">
      <Link
        className="underline decoration-solid"
        href={paths.categoryShow(slug)}
      >
        {"< "}Back to {slug}
      </Link>
      <LocationShow locationId={locationId} />
      <CommentCreateForm locationId={locationId} startOpen />
      <CommentList fetchData={() => fetchCommentsByLocationId(locationId)} />
    </div>
  );
}
