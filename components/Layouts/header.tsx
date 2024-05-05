'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

import BLOG from '@/blog.config';

const NavBar = () => {
  const links = [
    { id: 0, name: 'note', to: BLOG.note || '/', show: true },
    { id: 1, name: 'X', to: BLOG.socialLink, show: true },
    { id: 2, name: 'Instagram ', to: BLOG.instagram, show: true },
    // { id: 2, name: 'RSS', to: '/feed', show: true },
    // { id: 3, name: 'Search', to: '/search', show: true },
  ];
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          (link) =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>{link.name}</Link>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

const Header = ({
  navBarTitle,
  fullWidth,
}: {
  navBarTitle: string | null;
  fullWidth: boolean;
}) => {
  const useSticky = !BLOG.autoCollapsedNavBar;
  const navRef = useRef<HTMLDivElement>(null);
  const sentinalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = ([entry]: [any]) => {
      if (navRef && navRef.current && useSticky) {
        if (!entry.isIntersecting && entry !== undefined) {
          navRef.current.classList.add('sticky-nav-full');
        } else {
          navRef.current.classList.remove('sticky-nav-full');
        }
      } else {
        navRef?.current?.classList.add('remove-sticky');
      }
    };

    // @ts-ignore
    const obvserver = new window.IntersectionObserver(handler);
    // @ts-ignore
    obvserver.observe(sentinalRef.current);
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
  }, [sentinalRef, useSticky]);

  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            {navBarTitle ? (
              <p className="ml-2 font-medium text-day dark:text-night header-name">
                {navBarTitle}
              </p>
            ) : (
              <p className="ml-2 font-medium text-day dark:text-night header-name">
                {BLOG.title},{' '}
                <span className="font-normal">{BLOG.description}</span>
              </p>
            )}
          </Link>
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default Header;
