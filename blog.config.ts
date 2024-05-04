const BLOG = {
  title: '@hisasann日記',
  author: 'hisasann',
  email: 'hisasann25@gmail.com',
  link: 'https://dialy.hisasann.dev/',
  description: 'Yoshiyuki Hisamatsu',
  lang: 'ja-JP', // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES']
  appearance: 'auto', // ['light', 'dark', 'auto'],
  font: 'sans-serif', // ['sans-serif', 'serif']
  path: '', // leave this empty unless you want to deploy Nobelium in a folder
  since: 2021, // If leave this empty, current year will be used.
  postsPerPage: 30,
  // NOTE: notion は勝手によくわからないソート順で posts を返してくるので、日付順にしたい場合はここを true にする
  sortByDate: true, // sort by date or not (default is true)
  autoCollapsedNavBar: false, // The automatically collapsed navigation bar
  ogImageGenerateURL: 'https://hisasann.dev/assets/images/hisasann_400x400.jpg', // The link to generate OG image, don't end with a slash
  note: 'https://note.com/hisasann', // leave this empty unless you want to deploy Nobelium in a folder
  socialLink: 'https://twitter.com/hisasann',
  instagram: 'https://www.instagram.com/hisasann/',
  seo: {
    keywords: ['Blog', 'Website', 'Notion'],
    googleSiteVerification: '', // Remove the value or replace it with your own google site verification code
  },
  notionPageId: process.env.NOTION_PAGE_ID, // DO NOT CHANGE THIS！！！
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN, // Useful if you prefer not to make your database public
  analytics: {
    provider: '', // Currently we support Google Analytics and Ackee, please fill with 'ga' or 'ackee', leave it empty to disable it.
    ackeeConfig: {
      tracker: '', // e.g 'https://ackee.craigary.net/tracker.js'
      dataAckeeServer: '', // e.g https://ackee.craigary.net , don't end with a slash
      domainId: '', // e.g '0e2257a8-54d4-4847-91a1-0311ea48cc7b'
    },
    gaConfig: {
      measurementId: '', // e.g: G-XXXXXXXXXX
    },
  },
  isProd: process.env.VERCEL_ENV === 'production', // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
};

export default BLOG;
