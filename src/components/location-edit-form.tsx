"use client";

import { editLocation } from "@/actions";
import type { Location } from "@prisma/client";
import { useState } from "react";
import { TiptapEdit } from "./tiptap";

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
      <TiptapEdit editorContent={content} onChange={handleEditorChange} />
      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">
          Save
        </button>
      </form>
    </div>
  );
}
