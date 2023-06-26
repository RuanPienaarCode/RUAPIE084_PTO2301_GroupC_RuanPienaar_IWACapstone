import { books, BOOKS_PER_PAGE, authors } from "./data.js";
import { PAGES } from "./showMore.js";

let CURRENTGENRE = "none";
let CURRENTAUTHOR = "none";
let CURRENTTITLE = "none";

export const handlePreviewClick = (event) => {
  event.preventDefault();
  // Variable to store the HTML element with the attribute 'data-list-active'
  const overlay = document.querySelector("[data-list-active]");
  overlay.toggleAttribute("open");
  // Stores the HTML elements closest to the target with the class 'preview'
  const target = event.target.closest(".preview");
  // Stores the dataset of the target elements
  const targetData = target.dataset;
  // Stores book title of the dataset
  const bookTitle = targetData.previewTitle;
  // Stores the author of the dataset
  const bookAuthor = targetData.previewAuthor;
  // Stores the description of the dataset
  const bookDescription = targetData.previewDescription;
  // Stores the image link of the dataset
  const bookImageLink = targetData.previewImg;
  // Creates and stores a new date from the published date of the dataset
  const date = new Date(targetData.previewPublished);
  // Converts the date to year
  const bookPublished = date.getFullYear();

  // Gets and stores the target element for the title
  const overlayTitle = document.querySelector("[data-list-title]");
  // Gets and stores the target element for the image
  const overlayImg = document.querySelector("[data-list-image]");
  // Gets and stores the target element for the author
  const overlayAuthor = document.querySelector("[data-list-subtitle]");
  // Gets and stores the target element for the Description
  const overlayDescription = document.querySelector("[data-list-description]");

  /* 
        Adds the data grabbed to the idivdual HTML elements for title, author,
        image and description 
    */
  overlayTitle.innerHTML = `${bookTitle} (${bookPublished})`;
  overlayAuthor.innerHTML = bookAuthor;
  overlayImg.setAttribute("src", bookImageLink);
  overlayDescription.innerHTML = bookDescription;
};

/**
 * The purpose of this even handler is to toggle the Preview overlay
 * (with attribute 'data-list-active) when the 'close' button on the preview
 * is clicked
 */
export const handlePreviewToggle = () => {
  // Variable to store the HTML element with the attribute 'data-list-active'
  const overlay = document.querySelector("[data-list-active]");
  overlay.toggleAttribute("open");
};

/**
 * Take the elements in the preview divs and averts their click events
 * towards the div click event in order to fire the handlePreviewClick event
 */
export const handleClickAversion = (event) => {
  const newPreview = event.target.closest(".preview");
  newPreview.event;
};

/**
 * Event handler used to create the previews. It is called on startup to create the
 * previews and also called when a filter is applied to the list of books and the search
 * button is clicked.
 */
export const createPreviews = (event) => {
  event.preventDefault();
  // Initialise filters to be correct for when the site loads
  let filters = {
    title: "",
    genre: "any",
    author: "any",
  };
  // Variable used to store the form data of 'data-search-form'
  const formData = new FormData(document.querySelector("[data-search-form]"));
  // Copy values from search form over to filters object
  filters = Object.fromEntries(formData);

  //ternaries to check if values match global values
  const isCurrentAuhtor = CURRENTAUTHOR === filters.author;
  const isCurrentGenre = CURRENTGENRE === filters.genre;
  const isCurrentTitle = CURRENTTITLE === filters.title;
  // Assginment of global variables
  if (!isCurrentAuhtor || !isCurrentGenre || !isCurrentTitle) {
    CURRENTAUTHOR = filters.author;
    CURRENTGENRE = filters.genre;
    CURRENTTITLE = filters.title;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Initialisation of extracted books array
  let extractedBooks = [];
  // ternary to check if the current genre is equals to 'any'
  const genreAny = filters.genre === "any";
  // ternary to check if the current author is equals to 'any'
  const authorAny = filters.author === "any";
  // ternary to check if the current title is ''
  const titleEmpty = filters.title === "";

  // Conditional to check whether extractedBooks should be assigned with books as is
  // or should it be worked through with a specified title/genre/author
  if (genreAny && authorAny && titleEmpty) {
    extractedBooks = books;
  } else {
    for (let i = 0; i < books.length; i++) {
      // variable to store title with extra spaces removed and lowercased
      const trimTitle = filters.title.trim().toLowerCase();
      // variable to store the lowercase of the book[i] title
      const lowerCaseBookTitle = books[i].title.toLowerCase();

      // Check if title and author matches the captured inputs.
      const titleMatch = lowerCaseBookTitle.includes(trimTitle) ? true : false;
      const authorMatch =
        filters.author === "any" || books[i].author === filters.author;
      let genreMatch = "";
      // Loop to check the genres of the book[i]
      for (let j = 0; j < books[i].genres.length; j++) {
        // Check to see if genre of book matches input
        if (books[i].genres[j] === filters.genre) {
          genreMatch = true;
          break;
        } else {
          genreMatch = false;
        }
      }

      if (titleMatch && authorMatch && (genreMatch || genreAny)) {
        extractedBooks.push(books[i]);
      }
      const dataMessage = document.querySelector("[data-list-message]");
      // Check to see if no results were found
      if (extractedBooks.length < 1) {
        dataMessage.classList.add("list__message_show");
      } else {
        dataMessage.classList.remove("list__message_show");
      }
    }
  }
  // Assign the button 'data-list-button to variable'
  const button = document.querySelector("[data-list-button]");
  // Assign the parent to be appended to variable
  const listItem = document.querySelector("[data-list-items]");
  listItem.innerHTML = "";
  // Create new fragment
  const fragment = document.createDocumentFragment();
  let remaining = 0;

  // Loop  to ensure the books displayed matches the selection of user
  for (let i = 0; i < BOOKS_PER_PAGE * PAGES; i++) {
    let authorId;
    // if statement to stop loop if array returns undefined values
    if (extractedBooks[i] === undefined) {
      // Change button text
      button.innerHTML = "Show More 0";
      break;
    } else {
      authorId = extractedBooks[i].author;
    }

    /**
     * create object of book with the captured values
     */
    const book = {
      author: authors[authorId],
      authorID: authorId,
      id: extractedBooks[i].id,
      image: extractedBooks[i].image,
      title: extractedBooks[i].title,
      description: extractedBooks[i].description,
      published: extractedBooks[i].published,
    };
    // Create new HTML 'div'
    const element = document.createElement("div");
    // Assign event listener to div
    element.addEventListener("click", handlePreviewClick);
    // Assign class to div
    element.classList = "preview";
    // Assign attributes to div
    element.setAttribute("data-preview-id", book.id);
    element.setAttribute("data-preview-img", book.image);
    element.setAttribute("data-preview-title", book.title);
    element.setAttribute("data-preview-author", book.author);
    element.setAttribute("data-preview-description", book.description);
    element.setAttribute("data-preview-published", book.published);

    // Create div inner HTML
    element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${book.image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${book.title}</h3>
                <div class="preview__author">${book.author}</div>
            </div>
        `;
    // Add event listeners to different elements in div
    const newTitle = element.querySelector(".preview__title");
    newTitle.addEventListener("click", handleClickAversion);
    const newImg = element.querySelector(".preview__image");
    newImg.addEventListener("click", handleClickAversion);
    const newAuthor = element.querySelector(".preview__author");
    newAuthor.addEventListener("click", handleClickAversion);

    fragment.appendChild(element);
    remaining = extractedBooks.length - BOOKS_PER_PAGE * PAGES;
    // searchOverlayCancelButton.click()
  }

  // Append new fragment to 'data-list-items'
  const dataList = document.querySelector("[data-list-items]");
  dataList.appendChild(fragment);

  const dataListButton = document.querySelector("[data-list-button]");

  // Check to see if button should be disabled or not
  if (remaining > 0) {
    dataListButton.innerHTML = /* html */ `
            <span>Show more</span>
            <span class="list__remaining"> (${remaining})</span>
        `;
    dataListButton.removeAttribute("disabled");
  } else {
    dataListButton.setAttribute("disabled", true);
  }

  // Fire event to close search overlay
  const searchOverlayCancelButton = document.querySelector(
    "[data-search-cancel]"
  );
  searchOverlayCancelButton.click();
};
