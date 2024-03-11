/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */

import React, { useEffect, useState } from "react";

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

const Wrapper: React.FC<WrapperProps> = ({ children, minWidth, maxWidth }) => {
  return useMediaQuery({ minWidth, maxWidth }) ? <>{children}</> : null;
};

interface ResponsiveWrapperProps {
  children: React.ReactNode;
  xs?: boolean | string;
  sm?: boolean | string;
  md?: boolean | string;
  lg?: boolean | string;
  xl?: boolean | string;
}

const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = React.memo((props) => {
  const {
    children,
    xs,
    sm,
    md,
    lg,
    xl,
  } = props;

  if (!xs && !sm && !md && !lg && !xl) {
    return <>{children}</>;
  }

  const [views, setViews] = useState<Breakpoint[]>([]);

  useEffect(() => {
    const viewBreaks: Breakpoint[] = [];
    
    // Rest of the code remains unchanged...

    setViews(viewBreaks);
  }, [children, xs, sm, md, lg, xl]);

  let component: React.ReactNode;
  views.some((breakPoint) => {
    component = <Wrapper children={children} minWidth={breakPoint.minWidth} maxWidth={breakPoint.maxWidth} />;
    return (component as React.ReactElement)?.ref;
  });

  return <>{component}</>;
});

ResponsiveWrapper.defaultProps = {
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
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
