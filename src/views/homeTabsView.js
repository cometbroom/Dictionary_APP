import { DEFINITION_TABS_ID } from "../constants.js";
import { createElement } from "../tools/DOMCreate.js";

const NAVBAR_DEFINITION_ID = 'meaning-tabs';

function createDefinitionTabsView(props) {
	const root = createElement('section', {id: DEFINITION_TABS_ID});
	root.innerHTML = String.raw`
		<h3>${props.word}: </h3>
	`
	if (props?.navItems) {
		const nav = createNavItems(props.navItems, props.currentTab, props);
		root.appendChild(nav);
	}
	const defView = createDefinitionView(props.meaningData[props.currentTab]);
	root.appendChild(defView);
	return root;
}

function createNavItems(navItems = [], currentTab, propsRef) {
	const root = createElement('nav', {id: NAVBAR_DEFINITION_ID});
	const ulElement = createElement('ul');
	navItems.forEach((item, index) => {
		const li = createElement('li', {content: `As ${item}`});
		li.value = index;
		if (index === currentTab) li.classList.add("active");
		li.addEventListener('click', propsRef.onClick);
		ulElement.appendChild(li);
	});
	root.appendChild(ulElement);
	return root;
}

function createDefinitionView(data) {
	const root = createElement("div", {id: "definition-view"});
	let rootHTML = String.raw``;

	for(let i = 0; i < data.length; ++i) {
		rootHTML += String.raw`
		<h4>Definition:</h4>
		<h3>${data[i].definition}</h3>`
		if(data[i].synonyms.length > 0) {
			rootHTML += String.raw`
				<h4>Synonyms:</h4>
				<ul>
					${createSynonymsView(data[i].synonyms)}
				</ul>`
		}
		if (data[i].example) {
			rootHTML += String.raw`
				<h4>Example:</h4>
				<p>${data[i].example}</p>
			`
		}
		rootHTML += String.raw`
			<div class="separator"></div>
		`
	}

	root.innerHTML = rootHTML
	return root;
}

function createSynonymsView(synonyms) {
	let outerHtml = String.raw``;
	synonyms.forEach(example => {
		outerHtml += String.raw`<li>${example}</li>`;
	})
	return outerHtml;
}

export default createDefinitionTabsView;
