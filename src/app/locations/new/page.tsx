"use client";

import { startTransition, useActionState, useState } from "react";

import { createLocation } from "@/actions";
import { TiptapEditor } from "@/components/tiptap";

export default function LocationCreatePage() {
  const [formState, createAction] = useActionState(createLocation, {
    message: "",
  });

  const [content, setContent] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("content", content);
    startTransition(() => {
      createAction(formData);
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold m-3">Create a Location</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>

        <div className="flex gap-4">
          <label className="w-12" htmlFor="content">
            Content
          </label>
          <div className="w-full">
            <TiptapEditor editorContent={content} onChange={setContent} />
          </div>
        </div>

        {formState.message ? (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
            {formState.message}
          </div>
        ) : null}

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
