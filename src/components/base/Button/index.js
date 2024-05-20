/* eslint-disable react/button-has-type */
import { useButton } from '@react-aria/button';
import cn from 'classnames';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import Spin from '../Spin';

const Button = forwardRef(
  (
    {
      href,
      type = 'button',
      disabled,
      label,
      loading,
      shadow,
      fullWidth = false,
      className,
      leftIcon,
      onPress,
      onPressStart,
      onPressEnd,
      clean = false,
      variant = 'primary',
      size = 'medium',
      ...props
    },
    ref
  ) => {
    const { children } = props;

    const nativeButtonRef = useRef();
    const { buttonProps } = useButton(
      {
        isDisabled: disabled,
        onPress,
        onPressStart,
        onPressEnd,
        ...props,
        elementType: 'button',
      },
      nativeButtonRef
    );

    useImperativeHandle(ref, () => ({
      get nativeElement() {
        return nativeButtonRef.current;
      },
    }));

    const sizeClassNames = cn(
      {
        tiny: 'h-6 text-xs',
        small: 'h-8 text-sm leading-[18px]',
        medium: 'h-10 text-sm leading-[18px]',
        large: 'h-12 text-sm leading-[18px]',
      }[size]
    );

    const rootClassnames = !clean
      ? cn(
          'px-4 select-none transition-all duration-200 ease-linear inline-flex items-center justify-center cursor-pointer',
          'rounded-lg text-sm',
          !disabled && {
            'bg-sky-500 text-white': variant === 'primary',
            'bg-dark-brown text-primary': variant === 'secondary',
            'bg-transparent text-main border border-sky-500':
              variant === 'outline',
          },
          {
            'bg-transparent': disabled,
          },
          className
        )
      : className;

    const classes = cn(
      sizeClassNames,
      rootClassnames,
      shadow && 'drop-shadow',
      'font-bold outline-none focus:outline-none'
    );

    return (
      <motion.button
        whileTap={{ scale: 1.1 }}
        disabled={disabled}
        ref={nativeButtonRef}
        className={classes}
        type={type}
        {...(type !== 'submit' ? buttonProps : {})}
      >
        <div className={cn('flex-center w-full')}>
          {loading && <Spin className='mr-2' size={20} />}
          {!loading && leftIcon && <div className='mr-2'>{leftIcon}</div>}
          {label || children}
        </div>
      </motion.button>
    );
  }
);

Button.propTypes = {
  onPress: PropTypes.func,
  onPressEnd: PropTypes.func,
  onPressStart: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'default',
    'danger',
    'outline',
    'light',
    'subtle',
    'cancel',
    'link',
  ]),
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']), //  24 / 32 / 40 / 48 px
  clean: PropTypes.bool,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
};
Button.displayName = 'Button';
export default Button;
