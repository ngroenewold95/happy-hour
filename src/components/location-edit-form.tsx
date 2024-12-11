"use client";

import { editLocation } from "@/actions";
import type { Location } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { TiptapEditor } from "./tiptap";

interface LocationEditFormProps {
  location: Location;
}

export default function LocationEditForm({ location }: LocationEditFormProps) {
  const [content, setContent] = useState(location.content ?? "");
  const handleEditorChange = (value: string = "") => setContent(value);

  const editSnippetAction = editLocation.bind(null, location.id, content);

  return (
    <div>
      <h1>{location.title}</h1>
      <TiptapEditor editorContent={content} onChange={handleEditorChange} />
      <div className="flex gap-4">
        <form action={editSnippetAction}>
          <button type="submit" className="p-2 border rounded">
            Save
          </button>
        </form>
        <Link href={`/locations/${location.id}`} className="border p-2 rounded">
          Cancel
        </Link>
      </div>
    </div>
  );
}
