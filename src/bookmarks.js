import $ from 'jquery';
import store from './store';
import api from './api';

const redirectHome= function(){
$("header").click(function(){

})
}

//<button name="1" type="button">&#10032;</button ><button name="2" type="button">&#10032;</button><button name="3" type="button">&#10032;</button><button name="4" type="button">&#10032;</button><button name="5" type="button">&#10032;</button>
const addBookmarkHTML = `<form id="js-add-bookmark-form">
<fieldset>
<label for="link">Add Bookmark:</label><br>
<input type="url" name="url" required value="https://www." placeholder="Enter Link"><br>
<input type="text" required name="title" placeholder="Enter Title"><br>
        <select value="null" name="rating">
            <option disabled>Select Rating</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
<textarea name="desc" value=null placeholder="Add a Description (optional)"></textarea><br>
<button type="reset">Cancel</button>
<input id="create-bookmark" type="submit" placeholder="Create"><br>


</fieldset>
</form> `


const renderAddPage= function(){
$("#new-bookmark").click(function(event){
$("main").html(addBookmarkHTML)

}

)}

const handleAddBookmark = function () {
    renderAddPage();

    
$(document).on("submit", "#js-add-bookmark-form",function(event) {
        event.preventDefault();

        //$('.js-bookmark-list-entry').val('');

        const title= this.title.value
        const url=this.url.value
         const rating=this.rating.value
        const desc= this.desc.value

console.log(title,url,rating,desc)


        api.createBookmark(title, url, desc, rating)
            .then(res => res.json())
            .then((newBookmark) => {
                store.addBookmark(newBookmark);
                
                render();
            });

    });
};
//This function maps over the array then selects the title and adds it to the li tags
const generateBookmarkElement = function(bookmark) {
    let title = bookmark.title
    //this is the bookmark title
    const bookmarkTitle = `<li server-id="${bookmark.id}" class="js-bookmark-list-item toggle-item-expand"> ${bookmark.title} <button class="delete">Delete</button></li>`;
    // this is the clean bookmark title
    return bookmarkTitle;
}


// This function recevies the array and maps over it calling the generation of the html to be rendered
const generateBookmarkList = function (bookmarkz) {
    const bookmarksToRender = bookmarkz.map((item) => generateBookmarkElement(item));
    return bookmarksToRender.join('');
};

//This function receives the bookmarks from the store and calls the functions to map over it, select the titles and render to the dom
const render = function () {

    let bookmarks = [...store.bookmarks];
    
//should be bookmarks

    

    // render the shopping list in the DOM
    const bookmarkListTitles = generateBookmarkList(bookmarks);

    // insert that HTML into the DOM
    $('.js-bookmark-list').html(bookmarkListTitles);
};




/*const getBookmarkIdFromElement = function(bookmark) {
     const selected= $(bookmark).parent().data('server-id');
    console.log(selected,"this is selected");
     return selected
  };
  */
  const handleDeleteItemClicked = function () {
    // like in `handleItemCheckClicked`, we use event delegation
    $(document).on('click', '.delete', function(event){
      // get the index of the item in store.items
      
      console.log("delete was clicked",)
      const id = $(event.currentTarget).closest("li").attr("server-id")
      //This is the id to delete
      // delete the item
      api.deleteBookmark(id)
      .then(res => res.json())
      .then(() => {
        store.findAndDelete(id);
        render();
      //store.findAndDelete(id);
      // render the updated shopping list
     // render();
    
    });
  });
  };



/*handleExpandBookmark = function () {
    $("ul").on("click", ".js-bookmark-list-item", function (event) {
this.toogleClass(toggle-item-expand)
    })
}*/


const bindEventListeners = function () {
    handleAddBookmark();
    handleDeleteItemClicked();
   
    //generateBookmarkList();
   // generateBookmarkElement();
    
};
// This object contains the only exposed methods from this module:

export default {
    render,
    bindEventListeners
};