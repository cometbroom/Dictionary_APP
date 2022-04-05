import { DEFINITION_TABS_ID, TABS_SECTION_ID } from "../constants.js";
import { createElement } from "../tools/DOMCreate.js";
const NAVBAR_DEFINITION_ID = 'meaning-tabs';

function createDefinitionTabsView(props) {
	const root = createElement('section', {id: DEFINITION_TABS_ID});
	root.innerHTML = String.raw`
		<h3>${props.word}: </h3>
	`
	//If we have nav items, create tabs section.
	if (props?.navItems) {
		const tabsElement = createTabsSection(props);
		root.appendChild(tabsElement);
	}
	return root;
}

function createTabsSection(props) {
	const root = createElement("div", {id: TABS_SECTION_ID});
	const nav = createTabsBar(props);
	const defView = createDefinitionView(props.meaningData[props.currentTab]);

	root.append(nav, defView);
	return root;
}

function createTabsBar(propsRef) {
	const root = createElement('nav', {id: NAVBAR_DEFINITION_ID});
	const ulElement = createElement('ul');
	propsRef.navItems.forEach((item, index) => {
		const li = createElement('li', {content: `As ${item}`});
		//If the nav item is the selected item add active class.
		if (index === propsRef.currentTab) li.classList.add("active");
		//Value is used later to change tab with click event
		li.value = index;
		li.addEventListener('click', propsRef.onClick);
		ulElement.appendChild(li);
	});
	root.appendChild(ulElement);
	return root;
}

function createDefinitionView(data) {
	const root = createElement("div", {id: "definition-view"});
	let rootHTML = String.raw`
	<h4>${data.length} Definitions:</h4>`;

	for(let i = 0; i < data.length; ++i) {
		rootHTML += String.raw`
		<h3>- ${data[i].definition}</h3>`
		//If definition contains synonyms add them
		if(data[i].synonyms.length > 0) rootHTML += createSynonymsView(data[i].synonyms);
		//If definition contains example add it
		if (data[i].example) rootHTML += createExampleView(data[i].example);
		//Line separator
		rootHTML += String.raw`
			<div class="separator"></div>
		`
	}

	root.innerHTML = rootHTML
	return root;
}

function createSynonymsView(synonyms) {
	return String.raw`
		<h4>Synonyms:</h4>
		<ul>
			${createSynonymsItems(synonyms)}
		</ul>
		`
}

function createSynonymsItems(synonyms) {
	let outerHtml = String.raw``;
	synonyms.forEach(example => {
		outerHtml += String.raw`<span>${example}, </span>`;
	})
	return outerHtml;
}

function createExampleView(example) {
	return String.raw`
		<h4>Example:</h4>
		<p>${example}</p>
		`
}

export default createDefinitionTabsView;
