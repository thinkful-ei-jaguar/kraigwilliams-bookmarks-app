import $ from 'jquery';
import store from './store';
import api from './api';



const addBookmarkHTML = `<form class="js-add-bookmark-form">
<fieldset>
<label for="link">Add Bookmark:</label><br>
<input type="text" name="url" placeholder="Enter Link"><br>
<input type="text" required name="title" placeholder="Enter Title"><br>
<p><button name="1" type="button">&#10032;</button ><button name="2" type="button">&#10032;</button><button name="3" type="button">&#10032;</button><button name="4" type="button">&#10032;</button><button name="5" type="button">&#10032;</button></p>
<textarea name="descr" placeholder="Enter Description"></textarea><br>
<button type="reset">Cancel</button>
<input type="submit" placeholder="Create"><br>


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
    $('.js-add-bookmark-form').submit(function (event) {
        event.preventDefault();

        $('.js-bookmark-list-entry').val('');

        const title = event.target.title.value
        const url = event.target.url.value
        const rating = event.target.rating.value
        const descr = event.target.descr.value
        console.log(title, url, rating, descr)

        api.createBookmark(title, url, descr, rating)
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
    generateBookmarkList();
    generateBookmarkElement();
    
};
// This object contains the only exposed methods from this module:

export default {
    render,
    bindEventListeners
};