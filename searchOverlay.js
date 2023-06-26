import { authors, genres } from "./data.js";
/**
 * Event handler for the header search button. When clicked it will open the search
 * overlay and allow the user to input data that they would like the books to
 * be filtered by. This event handler is also used to create the options in both
 * the author and genre selectors
 */
export const createSearchOverlay = () => {
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
