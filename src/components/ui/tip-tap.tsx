"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import { ToolBar } from "@/components/ui/toolbar";

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
          "min-h-[130px] border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
