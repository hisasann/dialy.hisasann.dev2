import PropTypes from 'prop-types';

import BLOG from '@/blog.config';
import Footer from '@/components/Layouts/footer';
import Header from '@/components/Layouts/header';

import type { ReactNode } from 'react';

// import BlogPost from './BlogPost'

const Container = ({
  children,
  layout,
  fullWidth,
}: {
  children: ReactNode;
  layout: string | null;
  fullWidth: boolean;
}) => {
  const url = BLOG.path.length ? `${BLOG.link}/${BLOG.path}` : BLOG.link;
  const meta = {
    title: BLOG.title,
    type: 'website',
  };
  return (
    <div>
      <div
        className={`wrapper ${
          BLOG.font === 'serif' ? 'font-serif' : 'font-sans'
        }`}
      >
        <Header
          navBarTitle={layout === 'blog' ? meta.title : null}
          fullWidth={fullWidth}
        />
        <main
          className={`m-auto flex-grow w-full transition-all ${
            !fullWidth ? 'max-w-2xl px-4' : 'px-4 md:px-24'
          }`}
        >
          {children}
        </main>
        <Footer fullWidth={fullWidth} />
      </div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
