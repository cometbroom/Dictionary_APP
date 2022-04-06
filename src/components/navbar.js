import { NAVBAR_SECTION_QUERY } from "../constants.js";
import router from "../lib/router.js";
import { checkForInvalids } from "../pages/homePage.js";
import { createElement } from "../tools/DOMCreate.js";

export const MEANING_INDEX = 0;
export const LOGO_INDEX = 1;
export const RHYMES_INDEX = 2;

//Data to keep track of active and content
const navData = {
  current: 0,
  navOptions: [
    { content: "Meaning", value: 0, onClick: navClickHandler },
    {
      innerHTML: String.raw`
        <img id="logo" src='./public/logoWords.svg'>
      `,
    },
    { content: "Rhymes", value: 2, onClick: navClickHandler },
  ],
};

function createNavComponent(activeTab) {
  //Reset our previous header
  const sectionHeader = document.querySelector(NAVBAR_SECTION_QUERY);
  sectionHeader.innerHTML = "";

  //Conditionally set our active tab
  if (activeTab) navData.current = activeTab;

  const navItems = createNavItems(navData);
  sectionHeader.appendChild(navItems);

  return sectionHeader.clientHeight;
}

function createNavItems(props) {
  const ul = createElement("ul");

  //For each option in our navData, create list.
  props.navOptions.forEach((option, index) => {
    const li = createElement("li", option);

    if (props.current === index) li.classList.add("active");

    ul.appendChild(li);
  });

  return ul;
}

function navClickHandler() {
  //Decode URL of click
  const [currentHash, ...rest] = decodeURI(window.location.hash).split("/");
  navData.current = this.value;
  switch (navData.current) {
    case 0:
      navigateToPage(currentHash, "home", ...rest);
      break;
    case 2:
      navigateToPage(currentHash, "rhymes", ...rest);
      break;
  }
}

function navigateToPage(currentHash, targetHash, ...params) {
  //If invalid in params or in error page, don't pass params to apps.
  if (
    [...params].some((item) => checkForInvalids(item, true) === false) ||
    currentHash == "#error"
  ) {
    router.navigateTo(targetHash);
  } else {
    router.navigateTo(targetHash, ...params);
  }
}

export default createNavComponent;
