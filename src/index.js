import $ from 'jquery';
import api from './api';
import store from './store';
import allBookmarks from './bookmarks';
//import 'normalize.css';
import './index.css';



const main = function () {
 

    api.getBookmarks()
    .then(res => res.json())
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      allBookmarks.render();
  
  
  
    });
   
    allBookmarks.bindEventListeners();
    console.log("***************************")
    allBookmarks.render();
  };
  
  $(main);
  