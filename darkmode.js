/**
 *Event handler for the user's interaction with the settings button positioned at the top of the header.
 *This function facilitates the toggling of the visibility for the settings overlay.
 */
export const handleSettingsOverlayToggle = () => {
  // Get the settings overlay element and store it in a variable
  const settingsOverlay = document.querySelector("[data-settings-overlay]");
  settingsOverlay.toggleAttribute("open");
};

/**
 * Event handler triggered when the user modifies the site's theme by clicking the save button on the settings overlay.
 * This function handles the change and updates the theme accordingly.
 */
export const handleSettingsSave = (event) => {
  /**
   * Holds the color values for the light theme
   */
  const day = {
    dark: "10, 10, 20",
    light: "255, 255, 255",
  };

  /**
   * Holds the color values for the dark theme
   */
  const night = {
    dark: "255, 255, 255",
    light: "10, 10, 20",
  };
  event.preventDefault();
  // Assign form to variable
  const form = document.querySelector("[data-settings-form]");
  // Capture data from form
  // This line creates a new instance of the FormData object and assigns it to the variable formData.
  // The FormData constructor takes the form element as a parameter, allowing it to automatically collect all the input values from the form.
  const formData = new FormData(form);
  // Extract data from formData
  // This line uses the Object.fromEntries() method to convert the formData object into a regular JavaScript object.
  //The formData object contains a collection of key-value pairs, where the keys are the names of the form inputs and the values are the corresponding input values.
  // The Object.fromEntries() method converts this collection into a JavaScript object, where the keys and values are preserved.
  const result = Object.fromEntries(formData);

  //ternarary to check if the user selected night or day
  const isDay = result.theme === "day";

  // Assingment of different color properties depending on user selection
  if (isDay) {
    document.documentElement.style.setProperty("--color-light", day.light);
    document.documentElement.style.setProperty("--color-dark", day.dark);
  } else {
    document.documentElement.style.setProperty("--color-dark", night.dark);
    document.documentElement.style.setProperty("--color-light", night.light);
  }
  const overlay = document.querySelector("[data-settings-overlay]");
  overlay.toggleAttribute("open");
};
