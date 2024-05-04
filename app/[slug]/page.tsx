import { createHash } from 'crypto';

import BLOG from '@/blog.config';
import Blog from '@/components/Layouts/blog';
import { getAllPosts } from '@/lib/notion/getAllPosts';
import { getPostBlocks } from '@/lib/notion/getPostBlocks';

/**
 * Generates static params for each post.
 *
 * @returns {Promise<string[]>} - An array of static params for each post.
 */
export async function generateStaticParams(): Promise<string[]> {
  const posts = await getAllPosts({ includePages: true });
  return posts.map((row: any) => `${BLOG.path}/${row.slug}`);
}

/**
 * Retrieves a post by its slug.
 *
 * @param {Object} options - The options for retrieving the post.
 * @param {string | undefined | string[]} options.slug - The slug of the post.
 *
 * @return {Promise<Object>} A promise that resolves with an object containing the post, block map, and email hash.
 */
async function getPost({
  slug,
}: {
  slug: string | undefined | string[];
}): Promise<{ post: any; blockMap: any; emailHash: string }> {
  const posts = await getAllPosts({ includePages: true });
  const post = posts.find((t: any) => t.slug === slug);
  const blockMap = await getPostBlocks(post.id);
  const emailHash = createHash('md5')
    .update(BLOG.email)
    .digest('hex')
    .trim()
    .toLowerCase();

  return { post, blockMap, emailHash };
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { post, blockMap, emailHash } = await getPost({
    slug: params.slug,
  });

  if (!post) return null;
  return (
    <Blog
      blockMap={blockMap}
      frontMatter={post}
      emailHash={emailHash}
      fullWidth={post.fullWidth}
    >
      {''}
    </Blog>
  );
}
