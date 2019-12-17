const bookmarks = [];







  const addBookmark = function (bookmark) {
    this.bookmarks.push(bookmark);
  };

  const findById = function (id) {
    return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
  };

  const findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
  };

  export default{
bookmarks,
findById,
addBookmark,
findAndDelete,

  }