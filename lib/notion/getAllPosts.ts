import { NotionAPI } from 'notion-client';
import { idToUuid } from 'notion-utils';

import BLOG from '@/blog.config';

import filterPublishedPosts from './filterPublishedPosts';
import getAllPageIds from './getAllPageIds';
import getPageProperties from './getPageProperties';

// properties: {
//   id: '6571f071-2fbf-4183-95de-badb732e523a',
//     date: { start_date: '2021-09-05' },
//   slug: '2021-09-05',
//     type: [ 'Post' ],
//     status: [ 'Published' ],
//     summary: 'sour-lemon.dev',
//     tags: [ '日記', 'プログラミング', 'ビジネス' ],
//     Name: '2021年9月5日'
// }
type Properties = {
  id?: string;
  date?: { start_date: string };
  slug?: string;
  type?: string[];
  status?: string[];
  summary?: string;
  tags?: string[];
  Name?: string;
  title?: string;
  createdTime?: string;
  fullWidth?: boolean;
};

export async function getAllPosts({
  includePages = false,
}: {
  includePages: boolean;
}) {
  let id = BLOG.notionPageId || '';
  const authToken = BLOG.notionAccessToken || undefined;
  const api = new NotionAPI({ authToken });
  const response = await api.getPage(id);

  id = idToUuid(id);
  console.log('id:', id);
  const collection = Object.values(response.collection)[0]?.value;
  const collectionQuery = response.collection_query;
  // '035e9949-a6cc-4692-9fb6-8c37a080dda2': {
  //   value: {
  //     id: '035e9949-a6cc-4692-9fb6-8c37a080dda2',
  //       version: 265,
  //       type: 'page',
  //       properties: [Object],
  //       content: [Array],
  //       format: [Object],
  //       created_time: 1632369240000,
  //       last_edited_time: 1691864943931,
  //       parent_id: '8ef50ff3-07a9-4109-9fdb-be8c2fd05f7c',
  //       parent_table: 'collection',
  //       alive: true,
  //       created_by_table: 'notion_user',
  //       created_by_id: '8b607f65-0109-42a3-90f2-16b0d1f320c5',
  //       last_edited_by_table: 'notion_user',
  //       last_edited_by_id: '8b607f65-0109-42a3-90f2-16b0d1f320c5',
  //       space_id: '9eeb5f23-a714-4f8d-aeea-51f8ecabeb0b'
  //   },
  //   role: 'reader'
  // },
  const block = response.block;
  const schema = collection?.schema;

  const rawMetadata = block[id].value;

  // Check Type
  if (
    rawMetadata?.type !== 'collection_view_page' &&
    rawMetadata?.type !== 'collection_view'
  ) {
    console.log(`pageId "${id}" is not a database`);
    return null;
  } else {
    // Construct Data
    const pageIds = getAllPageIds(collectionQuery);
    const data = [];
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i];
      const properties: Properties = await getPageProperties(
        id,
        block,
        schema,
        undefined,
      );

      // Note: title がない場合は Name を入れて対応
      properties.title = properties.title || properties.Name;
      // Add fullwidth, createdtime to properties
      properties.createdTime = new Date(
        block[id]?.value?.created_time,
      ).toString();
      properties.fullWidth = block[id]?.value?.format?.page_full_width ?? false;

      data.push(properties);
    }

    // console.log('data:', data);
    // remove all the the items doesn't meet requirements
    const posts = filterPublishedPosts({ posts: data, includePages });

    // Sort by date
    if (BLOG.sortByDate) {
      posts.sort((a: any, b: any) => {
        const dateA = new Date(a?.date?.start_date || a.createdTime);
        const dateB = new Date(b?.date?.start_date || b.createdTime);
        // @ts-ignore
        return dateB - dateA;
      });
    }
    return posts;
  }
}
