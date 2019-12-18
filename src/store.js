const bookmarks = [];
const expanded= false;
const filtered = true;





  const addBookmark = function (bookmark) {
    this.bookmarks.push(bookmark);
  };

  const findById = function (id) {
    return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
  };

  const findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
  };

  const toggleExpanded = function(){
this.expanded=!this.expanded
  };

  export default{
bookmarks,
findById,
addBookmark,
findAndDelete,
expanded,
toggleExpanded
  }