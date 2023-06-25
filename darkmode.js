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
   * Holds the color values for the day theme
   */
  const day = {
    dark: "10, 10, 20",
    light: "255, 255, 255",
  };

  /**
   * Holds the color values for the night theme
   */
  const night = {
    dark: "255, 255, 255",
    light: "10, 10, 20",
  };
  event.preventDefault();
  // Assign form to variable
  const form = document.querySelector("[data-settings-form]");
  // Capture data from form
  const formData = new FormData(form);
  // Extract data from formData
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
