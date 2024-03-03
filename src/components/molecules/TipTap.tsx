"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import { ToolBar } from "@/components/molecules/Toolbar";

type Props = {
  description: string;
  onChange: (richText: string) => void;
};

export const TipTap = ({ description, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: "text-2xl font-bold",
          levels: [2],
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "ring-offset-[#21262D] min-h-[130px] rounded-md border border-default bg-default px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  return (
    <div className="flex flex-col space-y-4">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
