import { NAVBAR_SECTION_QUERY } from "../constants.js";
import router from "../lib/router.js";
import { createElement } from "../tools/DOMCreate.js";

export const MEANING_INDEX = 0;
export const LOGO_INDEX = 1;
export const RHYMES_INDEX = 2;

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
  const sectionHeader = document.querySelector(NAVBAR_SECTION_QUERY);
  sectionHeader.innerHTML = "";
  if (activeTab) navData.current = activeTab;
  const navItems = createNavItems(navData);
  sectionHeader.appendChild(navItems);
  return sectionHeader.clientHeight;
}

function createNavItems(props) {
  const ul = createElement("ul");
  props.navOptions.forEach((option, index) => {
    const li = createElement("li", option);
    if (props.current === index) li.classList.add("active");
    ul.appendChild(li);
  });
  return ul;
}

function navClickHandler() {
  const [, ...rest] = decodeURI(window.location.hash).split("/");
  navData.current = this.value;
  switch (this.value) {
    case 0:
      router.navigateTo("home", ...rest);
      break;
    case 2:
      router.navigateTo("rhymes", ...rest);
      break;
  }
}

export default createNavComponent;
