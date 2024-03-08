import React, { useState } from 'react';

import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Collapse } from 'reactstrap';

import { BreadCrumb as BreadCrumbType } from '@/lib/types';

interface BreadCrumbProps {
  breadcrumbs?: BreadCrumbType[];
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ breadcrumbs }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Breadcrumb>
        {breadcrumbs?.map((item: BreadCrumbType) => (
          <React.Fragment key={item.id}>
            <BreadcrumbItem>
            {item.url ? (
                <Link href={item.url}>{item.text}</Link>
              ) : (
                <span>{item.text}</span>
              )}
            </BreadcrumbItem>
            <li className="b-toggle-mobile">
              <button
                className={`btn-breadcrumb ${expanded ? 'expanded' : ''}`}
                onClick={() => {
                  setExpanded(!expanded);
                  toggle();
                }}
              ></button>
            </li>
          </React.Fragment>
        ))}
      </Breadcrumb>
      <Collapse isOpen={isOpen} className="b-collapse-link">
        <Link href="#">Home</Link>
      </Collapse>
    </div>
  );
};

export default BreadCrumb;
