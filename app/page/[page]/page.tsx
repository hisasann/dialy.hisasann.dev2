import BLOG from '@/blog.config';
import Container from '@/components/Elements/Base/container';
import BlogPost from '@/components/Elements/Blog/blog-post';
import Pagination from '@/components/Layouts/pagination';
import { getAllPosts } from '@/lib/notion/getAllPosts';

/**
 * The revalidate variable is used to indicate whether a particular operation should be revalidated.
 * It represents a boolean value where:
 * - true indicates that the operation should be revalidated
 * - false indicates that the operation should not be revalidated
 *
 * @type {boolean}
 */
// export const revalidate: number = 1;

/**
 * Retrieves the posts to be displayed on a page.
 *
 * @returns {Promise<{
 *    page: number,
 *    postsToShow: Array,
 *    showNext: boolean
 * }>} The retrieved posts information.
 */
async function getPosts({ page }: { page: string }): Promise<{
  page: number;
  postsToShow: Array<any>;
  showNext: boolean;
}> {
  let _page = parseInt(page, 10);
  _page = page === undefined ? 1 : _page;
  const posts = await getAllPosts({ includePages: false });
  const postsToShow = posts.slice(
    BLOG.postsPerPage * (_page - 1),
    BLOG.postsPerPage * _page,
  );
  const totalPosts = posts.length;
  const showNext = _page * BLOG.postsPerPage < totalPosts;
  return {
    page: _page, // current page
    postsToShow,
    showNext,
  };
}

type Params = {
  page: string;
};

// export async function generateStaticParams(): Promise<Params[]> {
//   const posts = await getAllPosts({ includePages: false });
//
//   if (!posts || posts.length === 0) {
//     return [{ page: 'not-found' }];
//   }
//
//   const totalPosts = posts.length;
//   const totalPages = Math.ceil(totalPosts / BLOG.postsPerPage);
//   return Array.from({ length: totalPages - 1 }, (_, i) => {
//     return '' + (i + 2);
//   }).map((page) => {
//     return {
//       page,
//     };
//   });
// }

export default async function Page({ params }: { params: Params }) {
  console.log('Page params:', params);
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
