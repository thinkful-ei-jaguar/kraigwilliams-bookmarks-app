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
<input type="url" name="url"  value="https://www." placeholder="Enter Link"><br>
<input type="text" required name="title" placeholder="Enter Title"><br>
        <select name="rating">
            <option  selected disabled>Select Rating</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
<textarea name="desc" placeholder="Add a Description (optional)"></textarea><br>
<button type="reset">Cancel</button>
<input id="create-bookmark" type="submit" placeholder="Create"><br>


</fieldset>
</form> `


const renderAddPage= function(){
$("#new-bookmark").click(function(event){
$("main").html(addBookmarkHTML)
console.log("render addpage ran")
}

)}

const handleAddBookmark = function () {
    renderAddPage();
console.log("*************** should be able to add bookmarks")
    
$(document).on("submit", "#js-add-bookmark-form",function(event) {
        event.preventDefault();
console.log("***************i was clicked");
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
                console.log(newBookmark);
                render();
            });

    });
};
//This function maps over the array then selects the title and adds it to the li tags
const generateBookmarkElement = function(bookmark) {
    let title = bookmark.title
    console.log("this is the bookmark title", title)
    const bookmarkTitle = `<li class ="js-bookmark-list-item toggle-item-expand"> ${bookmark.title}</li>`;
    console.log(bookmarkTitle, "this is the clean bookmark title")
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
    
console.log("should be bookmarks", bookmarks)

    

    // render the shopping list in the DOM
    const bookmarkListTitles = generateBookmarkList(bookmarks);
console.log("all the li", bookmarkListTitles)
    // insert that HTML into the DOM
    $('.js-bookmark-list').html(bookmarkListTitles);
};







/*handleExpandBookmark = function () {
    $("ul").on("click", ".js-bookmark-list-item", function (event) {
this.toogleClass(toggle-item-expand)
    })
}*/


const bindEventListeners = function () {
    handleAddBookmark();
   console.log("Bind event listeners")
    //generateBookmarkList();
   // generateBookmarkElement();
    
};
// This object contains the only exposed methods from this module:

export default {
    render,
    bindEventListeners
};