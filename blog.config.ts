const BLOG = {
  title: '@hisasann日記',
  author: 'hisasann',
  email: 'hisasann25@gmail.com',
  link: 'https://dialy.hisasann.dev/',
  description: 'hisasannの日記です。',
  lang: 'ja-JP', // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES']
  appearance: 'auto', // ['light', 'dark', 'auto'],
  font: 'sans-serif', // ['sans-serif', 'serif']
  path: '', // leave this empty unless you want to deploy Nobelium in a folder
  since: 2021, // If leave this empty, current year will be used.
  postsPerPage: 30,
  // NOTE: notion は勝手によくわからないソート順で posts を返してくるので、日付順にしたい場合はここを true にする
  sortByDate: true, // sort by date or not (default is true)
  autoCollapsedNavBar: false, // The automatically collapsed navigation bar
  authors: [{ name: 'hisasann', url: 'https://hisasann.dev/' }],
  ogImageGenerateURL: 'https://hisasann.dev/assets/images/hisasann_400x400.jpg', // The link to generate OG image, don't end with a slash
  note: 'https://note.com/hisasann', // leave this empty unless you want to deploy Nobelium in a folder
  socialLink: 'https://twitter.com/hisasann',
  instagram: 'https://www.instagram.com/hisasann/',
  seo: {
    keywords: ['日記', 'article', 'ブログ', 'blog'],
    googleSiteVerification: '', // Remove the value or replace it with your own google site verification code
  },
  notionPageId: process.env.NOTION_PAGE_ID, // DO NOT CHANGE THIS！！！
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN, // Useful if you prefer not to make your database public
  isProd: process.env.VERCEL_ENV === 'production', // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
};

export default BLOG;
