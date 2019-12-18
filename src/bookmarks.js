import $ from 'jquery';
import store from './store';
import api from './api';

/*const redirectHome = function () {
    $("header").click(function () {

    })
}*/



  const optionsHTML=  `<input id="new-bookmark" type="button" value=" + New Bookmark">
        <select id="rating-selction">
            <option selected disabled>Filter By</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>`
    


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
</form> `;

//adds the form element where the list of bookmarks will be nested
const startPage = function (bookmarkList) {
    const renderStartPageHTML = `<form aria-live="polite"><ul>${bookmarkList}<ul></form>`
    return renderStartPageHTML
}
const renderAddPage = function () {
    $(document).on("click","#new-bookmark",function (event) {
        console.log("new button clicked")
        $("main").html(addBookmarkHTML)

    }

    )
}

const handleAddBookmark = function () {
    renderAddPage();


    $(document).on("submit", "#js-add-bookmark-form", function (event) {
        event.preventDefault();

        

        const title = this.title.value
        const url = this.url.value
        const rating = this.rating.value
        const desc = this.desc.value

        console.log(title, url, rating, desc)


        api.createBookmark(title, url, desc, rating)
            .then(res => res.json())
            .then((newBookmark) => {
                store.addBookmark(newBookmark);

                render();
            });

    });
};
//This function maps over the array then selects the title and adds it to the li tags
const generateBookmarkElement = function (bookmark) {
    let title = bookmark.title
    //this is the bookmark title
    const bookmarkTitle = `<li rating=${bookmark.rating} server-id="${bookmark.id}" description="${bookmark.desc}" class="js-bookmark-list-item toggle-item-expand"> ${bookmark.title} <button class="expand">Show Description</button> <button class="delete">Delete</button></li>`;
    // this is the clean bookmark title
    return bookmarkTitle;
}

const generateEachDescription = function(bookmark){
    const description = `<span> ${bookmark.desc} <button>Close</button></span>`;
    return description
}

// This function recevies the array and maps over it calling the generation of the html to be rendered
const generateBookmarkList = function (bookmark) {
    const bookmarksList = bookmark.map((item) => generateBookmarkElement(item));
    return bookmarksList.join('');
};
const generateBookmarkDescriptions = function(bookmark){
    const bookmarkDescriptions = bookmark.map((item)=>generateEachDescription(item));
    return bookmarkDescriptions
}

const handleFiltering= function(){
const ratingToUse=$("#rating").val()
store.findByRating(ratingToUse)
   /*const filterChosen = $("select").val();
   store.bookmarks.filter(function(item){
    if(filterChosen===store.bookmarks.rating){
        return store
            }
   })*/

}
//This function receives the bookmarks from the store and calls the functions to map over it, select the titles and render to the dom
const render = function () {

    let bookmarks = [...store.bookmarks];
//const descrip =$(<span></span>).text(optionsHTML+bookmarkListTitles)

////    if(bookmarks.expanded){
//const showDescription =event.currentTarget.closest('li').val();
//showDescription.after(descrip)}


    // render the shopping list in the DOM
    const bookmarkListTitles = generateBookmarkList(bookmarks);
//const bookmarkListDescriptions= generateBookmarkDescriptions(bookmarks);
    // insert that HTML into the DOM
    // $('.js-bookmark-list').html(bookmarkListTitles);
    $("main").html(startPage(optionsHTML+bookmarkListTitles));
};




/*const getBookmarkIdFromElement = function(bookmark) {
     const selected= $(bookmark).parent().data('server-id');
    console.log(selected,"this is selected");
     return selected
  };
  */
const handleDeleteItemClicked = function () {
    // like in `handleItemCheckClicked`, we use event delegation
    $(document).on('click', '.delete', function (event) {
        // get the index of the item in store.items

        console.log("delete was clicked")
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

const getBookmarkIdFromElement = function(item) {
    return $(item).closest('li').attr('server-id');
  };

const handleExpandBookmark = function() {
    
    $(document).on("click", ".expand", function(event) {
    //store.expanded= !store.expanded;
        console.log(store.expanded)
        event.preventDefault();
    
        const currentBookmarkDescription = $(event.currentTarget).closest("li").attr("description")
        const addDescription =$("<span></span>").text(currentBookmarkDescription);
        $(event.currentTarget).closest("li").after(addDescription);
    })
}


const bindEventListeners = function () {
    handleAddBookmark();
    handleDeleteItemClicked();
    handleExpandBookmark(); 
    handleFiltering();

    //generateBookmarkList();
    // generateBookmarkElement();

};
// This object contains the only exposed methods from this module:

export default {
    render,
    bindEventListeners
};