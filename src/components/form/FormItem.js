import * as Label from "@radix-ui/react-label";
import cn from "classnames";
import { Children, useId, cloneElement } from "react";
import { Controller, get, useFormContext } from "react-hook-form";

const FormItem = ({
  name,
  required,
  children,
  className,
  label,
  ...inputProps
}) => {
  const formItemId = useId();
  const child = Children.only(children);

  const { control } = useFormContext() || {};

  return (
    <Controller
      rules={{
        ...(required ? { required: `Please enter ${label}` } : {}),
      }}
      name={name}
      control={control}
      render={({ field, formState }) => {
        const errorMessage = get(formState.errors, `${name}.message`);
        return (
          <div className={className}>
            {label && (
              <Label.Root
                className="font-bold leading-[13px]"
                htmlFor={formItemId}
              >
                <span className="text-tiny">{label}</span>
                {required && (
                  <span className="text-[9px] leading-3 text-primary ml-1">
                    *
                  </span>
                )}
              </Label.Root>
            )}
            <div className={cn(label && "mt-1")}>
              {cloneElement(child, {
                ...field,
                ...inputProps,
                error: errorMessage ? Boolean(errorMessage) : undefined,
                id: formItemId,
              })}
            </div>
            <p
              className={cn(
                "text-[11px] text-red-600",
                !errorMessage ? "max-h-0" : "mt-1 max-h-[40px]"
              )}
              role="alert"
              style={{
                transition: !errorMessage
                  ? "max-height 0.15s ease-out"
                  : "max-height 0.25s ease-in",
              }}
            >
              {errorMessage}
            </p>
          </div>
        );
      }}
    />
  );
};

export default FormItem;
