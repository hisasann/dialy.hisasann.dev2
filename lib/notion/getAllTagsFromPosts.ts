export function getAllTagsFromPosts(posts: any[]) {
  const taggedPosts = posts.filter((post) => post?.tags);
  const tags = [...taggedPosts.map((p) => p.tags).flat()];
  const tagObj = {};
  tags.forEach((tag) => {
    if (tag in tagObj) {
      // @ts-ignore
      tagObj[tag]++;
    } else {
      // @ts-ignore
      tagObj[tag] = 1;
    }
  });
  return tagObj;
}
