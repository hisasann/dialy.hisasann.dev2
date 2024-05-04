import { NotionAPI } from 'notion-client';

import BLOG from '@/blog.config';

export async function getPostBlocks(id: string) {
  const authToken = BLOG.notionAccessToken || undefined;
  const api = new NotionAPI({ authToken });
  const pageBlock = await api.getPage(id);
  return pageBlock;
}
