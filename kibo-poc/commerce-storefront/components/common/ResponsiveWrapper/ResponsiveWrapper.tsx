/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import React, { useEffect, useState, forwardRef, Ref } from "react";

import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

interface Breakpoint {
  minWidth: number;
  maxWidth?: number;
}

interface WrapperProps {
  children: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
}
interface ResponsiveWrapperProps {
  children: React.ReactNode;
  xs?: boolean | string;
  sm?: boolean | string;
  md?: boolean | string;
  lg?: boolean | string;
  xl?: boolean | string;
}

const Wrapper: React.ForwardRefRenderFunction<HTMLDivElement, WrapperProps> = (
  { children, minWidth, maxWidth },
  ref
) => {
  return useMediaQuery({ minWidth, maxWidth }) ? (
    <div ref={ref}>{children}</div>
  ) : null;
};

const ForwardedWrapper = forwardRef(Wrapper);

const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = React.memo(
  ({ children, xs, sm, md, lg, xl }) => {
    if (!xs && !sm && !md && !lg && !xl) {
      return <>{children}</>;
    }

    const [views, setViews] = useState<Breakpoint[]>([]);

    useEffect(() => {
      const viewBreaks: Breakpoint[] = [];
      // ... (Rest of the code remains unchanged)
      setViews(viewBreaks);
    }, [children, xs, sm, md, lg, xl]);

    let component: React.ReactNode;
    views.some((breakPoint) => {
      component = (
        <ForwardedWrapper
          ref={(instance) => {
            // 'instance' is the forwarded ref to the div
            // You can use 'instance' if needed, or you can forward it to other components.
          }}
          minWidth={breakPoint.minWidth}
          maxWidth={breakPoint.maxWidth}
        >
          {children}
        </ForwardedWrapper>
      );
      return false; // It's common to return false in a 'some' loop to stop iteration after finding the first match.
    });

    return <>{component}</>;
  }
);

ResponsiveWrapper.defaultProps = {
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
};

ResponsiveWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  xs: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sm: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  md: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  lg: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  xl: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default ResponsiveWrapper;