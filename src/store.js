const bookmarks = [];







  const addBookmark = function (bookmark) {
    this.bookmarks.push(bookmark);
  };

  const findById = function (id) {
    return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
  };


  export default{
bookmarks,
findById,
addBookmark,


  }