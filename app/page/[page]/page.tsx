import BLOG from '@/blog.config';
import Container from '@/components/Elements/Base/container';
import BlogPost from '@/components/Elements/Blog/blog-post';
import Pagination from '@/components/Layouts/pagination';
import { getAllPosts } from '@/lib/notion/getAllPosts';

/**
 * Retrieves the posts to be displayed on a page.
 *
 * @returns {Promise<{
 *    page: number,
 *    postsToShow: Array,
 *    showNext: boolean
 * }>} The retrieved posts information.
 */
async function getPosts({ page }: { page: number | undefined }): Promise<{
  page: number;
  postsToShow: Array<any>;
  showNext: boolean;
}> {
  page = page === undefined ? 1 : page;
  const posts = await getAllPosts({ includePages: false });
  const postsToShow = posts.slice(
    BLOG.postsPerPage * (page - 1),
    BLOG.postsPerPage * page,
  );
  const totalPosts = posts.length;
  const showNext = page * BLOG.postsPerPage < totalPosts;
  return {
    page, // current page
    postsToShow,
    showNext,
  };
}

export async function generateStaticParams(): Promise<string[]> {
  const posts = await getAllPosts({ includePages: false });
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / BLOG.postsPerPage);
  return Array.from({ length: totalPages - 1 }, (_, i) => '' + (i + 2));
}

export default async function Page({ params }: { params: { page: number } }) {
  const { page, postsToShow, showNext } = await getPosts({
    page: params.page,
  });

  return (
    <Container layout={'blog'} fullWidth={false}>
      {postsToShow &&
        postsToShow.map((post) => <BlogPost key={post.id} post={post} />)}
      <Pagination page={page} showNext={showNext} />
    </Container>
  );
}
