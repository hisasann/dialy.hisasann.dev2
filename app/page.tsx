import Image from "next/image";
import BLOG from '@/blog.config'
import { getAllPosts } from '@/lib/notion/getAllPosts'
import BlogPost from "@/components/Elements/Blog/blog-post";
import Link from "next/link";
import Container from "@/components/Elements/Base/container";

async function getPosts () {
  const posts = await getAllPosts({ includePages: false })
  const postsToShow = posts.slice(0, BLOG.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > BLOG.postsPerPage
  return {
    page: 1, // current page is 1
    postsToShow,
    showNext
  }
}

export default async function Home() {
  const { page, postsToShow, showNext} = await getPosts();

  return (
    <main className="flex min-h-screen flex-col items-start justify-between p-24">
      <Container title={BLOG.title} description={BLOG.description}>
        {postsToShow.map(post => (
          <BlogPost key={post.id} post={post} />
        ))}
        {/*{showNext && <Pagination page={page} showNext={showNext} />}*/}
      </Container>
    </main>
  );
}
