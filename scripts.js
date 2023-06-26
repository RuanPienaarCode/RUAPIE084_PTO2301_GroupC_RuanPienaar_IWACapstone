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
import { createSearchOverlay } from "./searchOverlay.js";
import { books } from "./data.js";
import { handleSettingsOverlayToggle, handleSettingsSave } from "./darkmode.js";
import { createPreviews, handlePreviewToggle } from "./bookpreview.js";
import { handleShowMoreClick, searchButton } from "./showMore.js";

/**
 * Holds the lenght of books (imported form data.js).
 * Books serves as the data for this website
 */
const RANGE = books.length;
// If books is not an array or if it's length is 1 thorw errors
if (!books && !Array.isArray(books)) throw new Error("Source required");
if (!RANGE && RANGE.length < 2)
  throw new Error("Range must be an array with two numbers");

const showMoreButton = document.querySelector("[data-list-button]");
showMoreButton.addEventListener("click", handleShowMoreClick);

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
