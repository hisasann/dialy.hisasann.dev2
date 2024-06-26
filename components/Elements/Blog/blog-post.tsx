import Link from 'next/link';

import BLOG from '@/blog.config';

const BlogPost = ({ post }: { post: any }) => {
  return (
    <Link href={`${BLOG.path}/${post.slug}`}>
      <article key={post.id} className="mb-6 md:mb-8">
        <header className="flex flex-col justify-between md:flex-row md:items-baseline">
          <h2 className="text-lg md:text-xl font-bold mb-2 cursor-pointer text-black dark:text-gray-100">
            {post.title}
          </h2>
        </header>
        <main>
          <p className="md:block leading-8 text-gray-700 dark:text-gray-300">
            {post.summary}
          </p>
        </main>
      </article>
    </Link>
  );
};

export default BlogPost;
