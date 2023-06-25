/**
 * Importing variables from the "./data.js" module.
 *
 * @module data
 * @type {Object}
 * @property {Array} books - An array of books.
 * @property {number} BOOKS_PER_PAGE - The number of books per page.
 * @property {Array} authors - An array of authors.
 * @property {Array} genres - An array of genres.
 */
import { books, BOOKS_PER_PAGE, authors, genres } from "./data.js";
import { handleSettingsOverlayToggle, handleSettingsSave } from "./darkmode.js";
/**
 *This event handler is responsible for toggling the Preview overlay by
 *activating or deactivating the 'data-list-active' attribute when the 'close'
 *button is clicked.
 */
const handlePreviewToggle = () => {
  // Variable to store the HTML element with the attribute 'data-list-active'
  const overlay = document.querySelector("[data-list-active]");
  overlay.toggleAttribute("open");
};

/**
 * Event handler for the header search button. When clicked it will open the search
 * overlay and allow the user to input data that they would like the books to
 * be filtered by. This event handler is also used to create the options in both
 * the author and genre selectors
 */
const createSearchOverlay = () => {
  // Variable used to store the overlay and used to toggle it's open attribute
  const searchOverlay = document.querySelector("[data-search-overlay]");
  searchOverlay.toggleAttribute("open");
  // Variable used to store the input for title of the search overaly
  const title = document.querySelector("[data-search-title]");
  title.focus();
  // Variable used to store the select element for genre
  const genreSelector = document.querySelector("[data-search-genres]");
  // Variable used to store the select element for author
  const authorSelector = document.querySelector("[data-search-authors]");

  // Variable used to create a new HTML element for 'authorSelector'
  const option = document.createElement("option");
  // creation of the first option for 'All Authors'
  option.setAttribute("value", "any");
  option.innerHTML = "All Authors";
  authorSelector.appendChild(option);

  // Variable used to create a new option for 'genreSelector'
  const optionGenres = document.createElement("option");
  // Creation of first option for 'All Genres'
  optionGenres.setAttribute("value", "any");
  optionGenres.innerHTML = "All Genres";
  genreSelector.appendChild(optionGenres);

  // Loop through the authors and create the options with the correct ID's and names
  for (const i in authors) {
    const authorName = authors[i];
    const authorId = i;
    const option = document.createElement("option");
    option.setAttribute("value", authorId);
    option.innerHTML = authorName;
    authorSelector.appendChild(option);
  }
  // Loop through genres and create the options with the correct ID's and names
  for (const i in genres) {
    const genreName = genres[i];
    const genreId = i;
    const option = document.createElement("option");
    option.setAttribute("value", genreId);
    option.innerHTML = genreName;
    genreSelector.appendChild(option);
  }
};

/**
 * Holds the lenght of books (imported form data.js).
 * Books serves as the data for this website
 */
const RANGE = books.length;
// If books is not an array or if it's length is 1 thorw errors
if (!books && !Array.isArray(books)) throw new Error("Source required");
if (!RANGE && RANGE.length < 2)
  throw new Error("Range must be an array with two numbers");

/**
 * Counter to keep track of the number of PAGES to be displayed.
 * This is used in later event handler to dictate how many books need to be displayed
 */
let PAGES = 1;

/**
 * Global variables used to detect changes in genre, title, author
 */
let CURRENTGENRE = "none";
let CURRENTAUTHOR = "none";
let CURRENTTITLE = "none";
/**
 * This is the event handler for the button with the attribute 'data-list-button'.
 * This is also known as the 'Show More' button. Main function of this event handler
 * is to increment PAGES to tell createPreviews how many PAGES of preview divs
 * to display
 */
const handleShowMoreClick = () => {
  PAGES++;
  searchButton.click();

  /* Stores the overlay cancel button and clicks it in order to hide the overlay
      that pops up as a result of the createPreviews function being called
    */
  const searchOverlayCancelButton = document.querySelector(
    "[data-search-cancel]"
  );
  searchOverlayCancelButton.click();
};

/**
 * Event handler used to create the previews. It is called on startup to create the
 * previews and also called when a filter is applied to the list of books and the search
 * button is clicked.
 */
const createPreviews = (event) => {
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
     * Represents a book.
     * @constructor
     * @param {string} id - The unique identifier of the book.
     * @param {string[]} genres - An array of genres associated with the book.
     * @param {number} popularity - The popularity rating of the book.
     * @param {string} title - The title of the book.
     * @param {string} image - The URL of the book's image.
     * @param {string} description - Description of the book.
     * @param {number} pages - The number of pages in the book.
     * @param {string} published - The published date of the book.
     * @param {string} author - The unique identifier of the author of the book.
     */
    const book = {
      /**
       * The unique identifier of the author of the book.
       * @type {string}
       */
      author: authors[authorId],

      authorID: authorId,
      /**
       * The unique identifier of the book.
       * @type {string}
       */
      id: extractedBooks[i].id,
      /**
       * The URL of the book's image.
       * @type {string}
       */
      image: extractedBooks[i].image,
      /**
       * The title of the book.
       * @type {string}
       */
      title: extractedBooks[i].title,
      /**
       * Description of the book.
       * @type {string}
       */
      description: extractedBooks[i].description,
      /**
       * The published date of the book.
       * @type {string}
       */
      published: extractedBooks[i].published,
    };
    // Create new HTML 'div'
    const element = document.createElement("div");
    // Assign event listener to div

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

  //   Fire event to close search overlay
  const searchOverlayCancelButton = document.querySelector(
    "[data-search-cancel]"
  );
  searchOverlayCancelButton.click();
};

const searchButton = document.querySelector(
  "body > dialog:nth-child(4) > div > div > button.overlay__button.overlay__button_primary"
);
searchButton.addEventListener("click", createPreviews);

const listCloseButton = document.querySelector("[data-list-close]");
listCloseButton.addEventListener("click", handlePreviewToggle);

const settingsSaveButton = document.querySelector(
  "body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary"
);
settingsSaveButton.addEventListener("click", handleSettingsSave);

const settingsCancelButton = document.querySelector("[data-settings-cancel]");
settingsCancelButton.addEventListener("click", handleSettingsOverlayToggle);

const settingsOverlayButton = document.querySelector("[data-header-settings]");
settingsOverlayButton.addEventListener("click", handleSettingsOverlayToggle);

const searchOverlayCancelButton = document.querySelector(
  "[data-search-cancel]"
);
searchOverlayCancelButton.addEventListener("click", createSearchOverlay);

const headerSearch = document.querySelector("[data-header-search]");
headerSearch.addEventListener("click", createSearchOverlay);
headerSearch.click();
searchButton.click();
