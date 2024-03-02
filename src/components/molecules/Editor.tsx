"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  text: string | null;
  className?: string;
};

export const Editor = ({ title, text, className }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit.configure({})],
    content: text,
    editable: false,
  });

  const isEmpty = !text && "rounded-md bg-[#0D1117]";

  return (
    <EditorContent
      editor={editor}
      className={cn(
        "line-clamp-2 flex h-[40px] w-full gap-1 text-sm",
        isEmpty,
        className,
      )}
    >
      {text && <span className="font-semibold">{title}:</span>}
    </EditorContent>
  );
};
