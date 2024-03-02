import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/atoms/form";
import { TipTap } from "./TipTap";

export interface RichTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label?: string;
  description?: string;
}

const RichTextFieldForm = React.forwardRef<
  HTMLInputElement,
  RichTextFieldProps
>(({ control, name, label, description }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <TipTap description={field.value} onChange={field.onChange} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
});

RichTextFieldForm.displayName = "RichTextField";

export { RichTextFieldForm };
