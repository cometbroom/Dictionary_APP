import { DEFINITION_TABS_ID } from "../constants.js";
import { createElement } from "../tools/DOMCreate.js";

const NAVBAR_DEFINITION_ID = 'meaning-tabs';

function createDefinitionTabsView(props) {
	const root = createElement('section', {id: DEFINITION_TABS_ID});
	root.innerHTML = String.raw`
		<h3>${props.word}: </h3>
	`
	if (props?.navItems) {
		const nav = createNavbarDefinition(props.navItems);
		root.appendChild(nav);
	}
	return root;
}

function createNavbarDefinition(navItems = []) {
	const root = createElement('nav', {id: NAVBAR_DEFINITION_ID});
	const ulElement = createElement('ul');
	navItems.forEach(item => {
		const li = createElement('li', {content: item});
		ulElement.appendChild(li);
	});
	root.appendChild(ulElement);
	return root;
}

export default createDefinitionTabsView;
