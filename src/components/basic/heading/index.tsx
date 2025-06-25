import React, { forwardRef } from "react";
import HeadingProps from "@/types/heading";

// H1 Component
const H1 = forwardRef<HTMLHeadingElement, HeadingProps>(({ children, className = "" }, ref) => {
  return (
    <h1 ref={ref} className={`font-mont font-bold text-4xl md:text-5xl lg:text-6xl ${className}`}>
      {children}
    </h1>
  );
});

H1.displayName = "H1";

// H2 Component
const H2 = forwardRef<HTMLHeadingElement, HeadingProps>(({ children, className = "" }, ref) => {
  return (
    <h2 ref={ref} className={`font-mont font-bold text-3xl md:text-4xl lg:text-5xl ${className}`}>
      {children}
    </h2>
  );
});
H2.displayName = "H2";

// H3 Component
const H3 = forwardRef<HTMLHeadingElement, HeadingProps>(({ children, className = "" }, ref) => {
  return (
    <h3 ref={ref} className={`font-mont font-bold text-2xl md:text-3xl lg:text-4xl ${className}`}>
      {children}
    </h3>
  );
});
H3.displayName = "H3";

// H4 Component
const H4 = forwardRef<HTMLHeadingElement, HeadingProps>(({ children, className = "" }, ref) => {
  return (
    <h4 ref={ref} className={`font-mont font-bold text-xl md:text-2xl lg:text-3xl ${className}`}>
      {children}
    </h4>
  );
});

H4.displayName = "H4";

// H5 Component
const H5 = forwardRef<HTMLHeadingElement, HeadingProps>(({ children, className = "" }, ref) => {
  return (
    <h5 ref={ref} className={`font-mont font-bold text-lg md:text-xl lg:text-2xl ${className}`}>
      {children}
    </h5>
  );
});

H5.displayName = "H5";

// H6 Component
const H6 = forwardRef<HTMLHeadingElement, HeadingProps>(({ children, className = "" }, ref) => {
  return (
    <h6 ref={ref} className={`font-mont font-bold text-sm md:text-sm lg:text-lg ${className}`}>
      {children}
    </h6>
  );
});

H6.displayName = "H6";

export { H1, H2, H3, H4, H5, H6 };