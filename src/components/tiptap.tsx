"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TipTapViewProps {
  editorContent: string;
}

interface TipTapEditProps extends TipTapViewProps {
  onChange: (content: string) => void;
}

export const TiptapEditor = ({ editorContent, onChange }: TipTapEditProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "shadow appearance-none min-h-[150px] border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline",
      },
    },
    content: editorContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  if (!editor) {
    return null;
  }
  return <EditorContent editor={editor} />;
};

export const TiptapViewer = ({ editorContent }: TipTapViewProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "shadow appearance-none min-h-[150px] border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline",
      },
    },
    content: editorContent,
    editable: false,
  });
  if (!editor) {
    return null;
  }
  return <EditorContent editor={editor} />;
};
