'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { NotionRenderer } from 'react-notion-x';

// NOTE: dynamic import をしないと画面が崩れるためコメントアウトした
// import { Code } from 'react-notion-x/build/third-party/code';
// import { Collection } from 'react-notion-x/build/third-party/collection';
// import { Equation } from 'react-notion-x/build/third-party/equation';
// import { Modal } from 'react-notion-x/build/third-party/modal';
// import { Pdf } from 'react-notion-x/build/third-party/pdf';

// import Comments from '@/components/Comments';
import BLOG from '@/blog.config';
import Container from '@/components/Elements/Base/container';
// import TagItem from '@/components/TagItem';
import formatDate from '@/lib/date/formatDate';

import type { ReactNode } from 'react';
// import { useLocale } from '@/lib/locale';

import 'react-notion-x/src/styles.css';

// via https://www.youtube.com/watch?v=J_dGmLOG5LM
// via https://github.com/Kacper-Hernacki/notion-as-cms-youtube/blob/main/components/notion/renderer.tsx
const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code),
);
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection,
  ),
);
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
);

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false,
  },
);
const Pdf = dynamic(() =>
  import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
);

const mapPageUrl = (id: string) => {
  return 'https://www.notion.so/' + id.replace(/-/g, '');
};

const Blog = ({
  children,
  blockMap,
  frontMatter,
  emailHash,
  fullWidth = false,
}: {
  children: ReactNode;
  blockMap: any;
  frontMatter: any;
  emailHash: any;
  fullWidth: boolean;
}) => {
  // const locale = useLocale();
  return (
    <Container
      layout="blog"
      // @ts-ignore
      title={frontMatter.title}
      description={frontMatter.summary}
      // date={new Date(frontMatter.publishedAt).toISOString()}
      type="article"
      fullWidth={fullWidth}
    >
      <article>
        <h1 className="font-bold text-3xl text-black dark:text-white">
          {frontMatter.title}
        </h1>
        {frontMatter.type[0] !== 'Page' && (
          <nav className="flex mt-7 items-start text-gray-500 dark:text-gray-400">
            <div className="flex mb-4">
              <a href={BLOG.socialLink || '#'} className="flex">
                <Image
                  alt={BLOG.author}
                  width={24}
                  height={24}
                  src={`https://gravatar.com/avatar/${emailHash}`}
                  className="rounded-full"
                />
                <p className="ml-2 md:block">{BLOG.author}</p>
              </a>
              <span className="block">&nbsp;/&nbsp;</span>
            </div>
            <div className="mr-2 mb-4 md:ml-0">
              {formatDate(
                frontMatter?.date?.start_date || frontMatter.createdTime,
                BLOG.lang,
              )}
            </div>
            {/*{frontMatter.tags && (*/}
            {/*  <div className="flex flex-nowrap max-w-full overflow-x-auto article-tags">*/}
            {/*    {frontMatter.tags.map((tag) => (*/}
            {/*      <TagItem key={tag} tag={tag} />*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*)}*/}
          </nav>
        )}
        {children}
        {blockMap && (
          <div className="-mt-4">
            <NotionRenderer
              recordMap={blockMap}
              // fullPage={true}
              // darkMode={true}
              // rootPageId={rootPageId}
              previewImages
              components={{
                Code,
                Collection,
                Equation,
                Modal,
                Pdf,
              }}
              mapPageUrl={mapPageUrl}
            />
          </div>
        )}
      </article>
      <div className="flex justify-between font-medium text-gray-500 dark:text-gray-400">
        <Link
          href={BLOG.path || '/'}
          className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
        >
          ← BACK
        </Link>
        <a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
          >
            ↑ {'TOP'}
          </button>
        </a>
      </div>
      {/*<Comments frontMatter={frontMatter} />*/}
    </Container>
  );
};

export default Blog;
