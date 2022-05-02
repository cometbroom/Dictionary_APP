import { createElement } from "../tools/DOMCreate.js";

const loadingData = {
  dots: 0,
  text: "Loading",
  colorArray: [],
};

function getLoadingScreen(appendTo) {
  /**
   * Makes a loading element and appends it to your target
   * @param {HTMLElement} appendTo - Target to append to
   * @returns {Number} Interval id to remove loading.
   */

  const display = createElement("h1", { class: "loading" });
  appendTo.appendChild(display);
  return animateLoading(display);
}

function animateLoading(display) {
  return setInterval(() => {
    displayLoadingData(display, loadingData);
    loadingData.dots++;
    if (loadingData.dots > 3) loadingData.dots = 0;
  }, 500);
}

function displayLoadingData(display, data) {
  display.textContent = `${data.text}${".".repeat(data.dots)}`;
}

export default getLoadingScreen;
