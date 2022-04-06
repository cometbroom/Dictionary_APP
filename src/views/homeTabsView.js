import { DEFINITION_TABS_ID, TABS_SECTION_ID } from "../constants.js";
import { createElement } from "../tools/DOMCreate.js";
const TABS_DEFINITION_ID = "meaning-tabs";

function createDefinitionTabsView(props) {
  const root = createElement("section", { id: DEFINITION_TABS_ID });
  root.innerHTML = String.raw`
		<h3>${props.word}: </h3>
	`;
  //If we have tab items, create tabs section.
  if (props?.tabOptions) {
    const tabsElement = createTabsSection(props);
    root.appendChild(tabsElement);
  }
  return root;
}

//Create of tabs section's bare bones with our passed in data
function createTabsSection(props) {
  const root = createElement("div", { id: TABS_SECTION_ID });
  const nav = createTabsBar(props);
  const currentTabData = props.tabOptions[props.currentTab].data;
  const defView = createDefinitionView(currentTabData);

  root.append(nav, defView);
  return root;
}

//Create display of our navbar in tabs section
function createTabsBar(propsRef) {
  const root = createElement("nav", { id: TABS_DEFINITION_ID });
  const ulElement = createElement("ul");
  propsRef.tabOptions.forEach((item, index) => {
    createTabItemView(item, index, propsRef, ulElement);
  });
  root.appendChild(ulElement);
  return root;
}

function createTabItemView(item, index, propsRef, ulElement) {
  const li = createElement("li", item);
  //If the nav item is the selected item add active class.
  if (index === propsRef.currentTab) li.classList.add("active");
  //Value is used later to change tab with click event
  li.value = index;
  li.addEventListener("click", propsRef.onClick);
  ulElement.appendChild(li);
}

function createDefinitionView(data) {
  const root = createElement("div", { id: "definition-view" });
  let rootHTML = String.raw`
	<h4>${data.length} Definitions:</h4>`;

  for (let i = 0; i < data.length; ++i) {
    rootHTML = createHtmlView(rootHTML, data, i);
  }

  root.innerHTML = rootHTML;
  return root;
}

//Will create HTML of our element and returns it as string.raw
function createHtmlView(rootHTML, data, i) {
  rootHTML += String.raw`
		<h3>- ${data[i].definition}</h3>`;
  //If definition contains synonyms add them
  if (data[i].synonyms.length > 0)
    rootHTML += createSynonymsView(data[i].synonyms);
  //If definition contains example add it
  if (data[i].example) rootHTML += createExampleView(data[i].example);
  //Line separator
  rootHTML += String.raw`
			<div class="separator"></div>
		`;
  return rootHTML;
}

//Bare bones to hold our synonyms items.
function createSynonymsView(synonyms) {
  return String.raw`
		<h4>Synonyms:</h4>
		<ul>
			${createSynonymsItems(synonyms)}
		</ul>
		`;
}

//Make HTML representation of our synonyms list.
function createSynonymsItems(synonyms) {
  let innerHtml = String.raw``;
  synonyms.forEach((example) => {
    innerHtml += String.raw`<span>${example}, </span>`;
  });
  return innerHtml;
}

function createExampleView(example) {
  return String.raw`
		<h4>Example:</h4>
		<p>${example}</p>
		`;
}

export default createDefinitionTabsView;
