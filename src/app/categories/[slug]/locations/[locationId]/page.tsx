import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import CommentShowLoading from "@/components/comments/comment-show-loading";
import LocationShow from "@/components/locations/location-show";
import LocationShowLoading from "@/components/locations/location-show-loading";
import { fetchCommentsByLocationId } from "@/db/queries/comments";
import paths from "@/paths";
import Link from "next/link";
import { Suspense } from "react";

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
      <Suspense fallback={<LocationShowLoading />}>
        <LocationShow locationId={locationId} />
      </Suspense>

      <CommentCreateForm locationId={locationId} startOpen />
      <Suspense fallback={<CommentShowLoading />}>
        <CommentList locationId={locationId} />
      </Suspense>
    </div>
  );
}
