import { deleteLocation } from "@/actions";
import { TiptapView } from "@/components/tiptap";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface LocationShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function LocationShowPage(props: LocationShowPageProps) {
  const { id } = await props.params;

  const location = await db.location.findFirst({
    where: { id: parseInt(id) },
  });

  if (!location) {
    return notFound();
  }

  const deleteLocationAction = deleteLocation.bind(null, location.id);
  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{location.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/locations/${location.id}/edit`}
            className="border p-2 rounded"
          >
            Edit
          </Link>
          <form action={deleteLocationAction}>
            <button className="border p-2 rounded">Delete</button>
          </form>
        </div>
      </div>
      <TiptapView editorContent={location.content ?? ""} />
    </div>
  );
}
