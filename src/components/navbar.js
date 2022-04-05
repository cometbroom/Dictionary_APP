import { NAVBAR_SECTION_QUERY } from "../constants.js";
import router from "../lib/router.js";
import { createElement } from "../tools/DOMCreate.js";

const navData = {
  current: 0,
  navOptions: [
    { content: "Meaning", value: 0, onClick: navClickHandler },
    { content: "Rhymes", value: 1, onClick: navClickHandler },
    { content: "Study your word" },
  ],
};

function createNavComponent() {
  const sectionHeader = document.querySelector(NAVBAR_SECTION_QUERY);
  sectionHeader.innerHTML = "";
  const navItems = createNavItems(navData);
  sectionHeader.appendChild(navItems);
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
    case 1:
      router.navigateTo("rhymes", ...rest);
      break;
  }
}

export default createNavComponent;
