const BASE_URL = 'https://thinkful-list-api.herokuapp.com/kraig';

function getBookmarks() {
    return fetch(`${BASE_URL}/bookmarks`);
}

const createBookmark = function (title, url, desc, rating) {
   
    //const newBookmark = JSON.stringify({ title, url, desc, rating });
    const newBookmark = { title, url, desc, rating };
    if(typeof newBookmark.rating !== "number") {
        delete newBookmark.rating

    }
    
    return fetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBookmark)
    });
}

function updateBookmark(id, updateData) {
    const update = JSON.stringify(updateData);
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: update
    })
}

let deleteBookmark = function (id) {
    return fetch(`${BASE_URL}/bookmarks/${id}`, {

        method: 'DELETE',

    });

};

export default {
    createBookmark,
    getBookmarks,
    updateBookmark,
    deleteBookmark

}