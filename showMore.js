/**
 * Counter to keep track of the number of PAGES to be displayed.
 * This is used in later event handler to dictate how many books need to be displayed
 */
export let PAGES = 1;
export const searchButton = document.querySelector(
  "body > dialog:nth-child(4) > div > div > button.overlay__button.overlay__button_primary"
);
/**
 * This is the event handler for the button with the attribute 'data-list-button'.
 * This is also known as the 'Show More' button. Main function of this event handler
 * is to increment PAGES to tell createPreviews how many PAGES of preview divs
 * to display
 */
export const handleShowMoreClick = () => {
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
