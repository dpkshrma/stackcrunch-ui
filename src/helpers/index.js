export const getPrevNextPageIds = (pageIds, currentPageId) => {
  const currentPageIdIndex = pageIds.indexOf(currentPageId);
  let prevPageId, nextPageId;
  if (currentPageIdIndex !== -1) {
    if (currentPageIdIndex !== 0) {
      prevPageId = pageIds[currentPageIdIndex - 1];
    }
    if (currentPageIdIndex !== pageIds.length - 1) {
      nextPageId = pageIds[currentPageIdIndex + 1];
    }
  }
  return { prevPageId, nextPageId };
};
