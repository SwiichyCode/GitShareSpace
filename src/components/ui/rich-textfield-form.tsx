import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { TipTap } from "./tip-tap";

export interface RichTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label?: string;
  description?: string;
}

export const RichTextFieldForm = ({
  control,
  name,
  label,
  description,
}: RichTextFieldProps) => {
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
};
