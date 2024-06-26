import cn from 'classnames';
import { forwardRef, memo, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(
  (
    {
      onChange,
      value,
      error,
      type = 'text',
      left,
      right,
      className,
      wrapperClassName,
      ...inputProps
    },
    ref
  ) => {
    const rootClassnames = useMemo(
      () =>
        cn(
          'h-10 block w-full text-xs enabled:hover:border-sky-500 disabled:bg-slate-50 disabled:text-dark-gray disabled:border-slate-200 disabled:shadow-none !font-normal',
          Boolean(error) &&
            'border-red-300 focus:border-red-300 peer enabled:hover:border-red-300 invalid:text-red-300'
        ),
      [error]
    );
    return (
      <div
        className={cn(
          'relative rounded-lg w-full ease-linear',
          wrapperClassName
        )}
      >
        {left}
        <input
          type={type}
          aria-invalid={error ? 'true' : 'false'}
          onChange={onChange}
          value={value}
          ref={ref}
          autoCapitalize='off'
          spellCheck='false'
          autoComplete='off'
          autoCorrect='off'
          className={twMerge(rootClassnames, className)}
          {...inputProps}
        />
        {right}
      </div>
    );
  }
);
Input.displayName = 'Input';
export default memo(Input);
