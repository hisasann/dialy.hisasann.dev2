import { idToUuid } from 'notion-utils'
export default function getAllPageIds (collectionQuery, viewId) {
  // console.log('collectionQuery:', collectionQuery);
  const views = Object.values(collectionQuery)[0]
  // console.log('views:', views);
  let pageIds = []
  if (viewId) {
    const vId = idToUuid(viewId)
    pageIds = views[vId]?.blockIds
  } else {
    const pageSet = new Set()
    Object.values(views).forEach(view => {
      // console.log('view:', view.collection_group_results.blockIds);
      view?.collection_group_results?.blockIds?.forEach(id => pageSet.add(id))
    })
    pageIds = [...pageSet]
    // console.log('pageSet:', pageSet);
  }
  return pageIds
}
