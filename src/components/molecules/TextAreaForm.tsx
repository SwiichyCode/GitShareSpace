import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "../atoms/form";
import { Textarea } from "../atoms/textarea";

export interface TextAreaFormProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  control: any;
  name: string;
  label?: string;
}

const TextAreaForm = React.forwardRef<HTMLTextAreaElement, TextAreaFormProps>(
  ({ className, control, name, label, ...props }, ref) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Textarea {...field} ref={ref} {...props} />
            </FormControl>

            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    );
  },
);

TextAreaForm.displayName = "TextAreaForm";
export { TextAreaForm };
