import * as React from "react";
import { Input } from "@/components/atoms/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/atoms/form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label?: string;
  description?: string;
}

const InputForm = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, control, name, label, description, ...props }, ref) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input {...field} ref={ref} type={type} {...props} />
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}

            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    );
  },
);

InputForm.displayName = "Input";

export { InputForm };
