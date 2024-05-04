export default function formatDate(date: any, local: any) {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  // @ts-ignore
  const res = d.toLocaleDateString(local, options);
  return local.slice(0, 2).toLowerCase() === 'zh'
    ? res.replace('年', ' 年 ').replace('月', ' 月 ').replace('日', ' 日')
    : res;
}
