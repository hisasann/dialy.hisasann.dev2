import BLOG from '@/blog.config';
import Container from '@/components/Elements/Base/container';
import BlogPost from '@/components/Elements/Blog/blog-post';
import { getAllPosts } from '@/lib/notion/getAllPosts';

async function getPosts() {
  const posts = await getAllPosts({ includePages: false });
  const postsToShow = posts.slice(0, BLOG.postsPerPage);
  const totalPosts = posts.length;
  const showNext = totalPosts > BLOG.postsPerPage;
  return {
    page: 1, // current page is 1
    postsToShow,
    showNext,
  };
}

export default async function Home() {
  const { page, postsToShow, showNext } = await getPosts();

  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-24">
      <Container layout={null} fullWidth={true}>
        {postsToShow.map((post: any) => (
          <BlogPost key={post.id} post={post} />
        ))}
        {/*{showNext && <Pagination page={page} showNext={showNext} />}*/}
      </Container>
    </main>
  );
}
