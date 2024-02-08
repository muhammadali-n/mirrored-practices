import Link from 'next/link';
import React, { ReactNode } from 'react';

interface SidebarProps {
  response: {
    collections: any;
    data: {
      collections: any
    };
  };
  isOpen: boolean;
  toggle: () => void;
}

const CustomLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: ReactNode }) => (
  <Link href={href} onClick={onClick}>
    {children}
  </Link>
);

const Sidebar = ({ response, isOpen, toggle }: SidebarProps): JSX.Element => {

  return (
    <div
      className={`sidebar-container fixed w-full h-full overflow-hidden justify-center bg-white grid pt-[120px] left-0 z-10 ${isOpen ? 'opacity-100 top-0' : 'opacity-0 top-[100%]'
        }`}
    >
      <button className="absolute right-0 p-5" onClick={toggle}>
        {/* Close icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          />
        </svg>
      </button>

      <ul className="sidebar-nav text-center leading-relaxed text-xl">
        {response.collections.items.map((items: { slug: string,name:string }) => (
          <li key={items.slug}>
            <CustomLink href="/about" onClick={toggle}>
              <p>{items.name}</p>
            </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
