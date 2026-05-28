// src/types/framer-motion.d.ts
declare module 'framer-motion' {
  import * as React from 'react';

  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    whileDrag?: any;
    whileFocus?: any;
    whileInView?: any;
    viewport?: any;
    drag?: any;
    dragConstraints?: any;
    dragElastic?: any;
    dragMomentum?: any;
    onDragStart?: any;
    onDragEnd?: any;
    onDrag?: any;
    layout?: any;
    layoutId?: any;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    key?: React.Key;
    ref?: React.Ref<any>;
    [key: string]: any;
  }

  export const motion: {
    div: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLDivElement>>;
    span: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLSpanElement>>;
    button: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLButtonElement>>;
    a: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLAnchorElement>>;
    img: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLImageElement>>;
    svg: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<SVGSVGElement>>;
    path: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<SVGPathElement>>;
    [key: string]: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<any>>;
  };

  export const AnimatePresence: React.FC<{
    children?: React.ReactNode;
    mode?: 'sync' | 'popLayout' | 'wait';
    initial?: boolean;
    onExitComplete?: () => void;
  }>;

  export function useAnimation(): any;
  export function useMotionValue<T>(initial: T): any;
  export function useTransform<T>(value: any, transformer: (v: any) => T): any;
  export function useSpring(value: any, config?: any): any;
  export function useScroll(options?: any): any;
  export function useInView(ref: React.RefObject<Element>, options?: any): boolean;
}