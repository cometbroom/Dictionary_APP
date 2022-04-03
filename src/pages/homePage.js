import { alertBelow } from '../components/alerter.js';
import { fetchDefinition } from '../fetchers/definitions.js';
import { C_TYPE } from '../tools/checkType.js';
import createDefinitionTabsView from '../views/homeTabsView.js';
import createHomeView from '../views/homeView.js';

const navData = {
	currentTab: 0,
  word: "",
  navItems: [],
  meaningData: [],
  onClick: tabClickHandler
}

function createHomePage(tabLocation) {
  console.log(tabLocation);
  const props = {
    onSubmit: btnClickHandler,
  }
  const homeView = createHomeView(props);

  return homeView;
}

function btnClickHandler(input) {
  return async function(e) {
    e.preventDefault();
    if (checkForInvalids(input.value) === false) return;
    const searchTerm = input.value.match(/\b[^\d\W]+\b/);
    try {
      const definitions = await fetchDefinition(searchTerm);
      updateNavData(definitions);
      createTabsSection();
      console.log(definitions);
    } catch (error) {
        alertBelow(error.message);
    }
  }
}

function createTabsSection() {
  const navView = createDefinitionTabsView(navData);
  document.querySelector(".home-container").appendChild(navView);
}


const checkForInvalids = (target) => {
  if (target === undefined) return false;
  if (target == "") {
    alertBelow("Please enter something");
    return false;
  }
  if(C_TYPE.isNumberedString(target)) {
    alertBelow("Numbers aren't allowed");
    return false;
  }
  if(!C_TYPE.isString) {
    alertBelow("Enter a string");
    return false;
  }
  const checkTerm = target.match(/\b[^\d\W]+\b/);
  if (checkTerm === null) {
    alertBelow("Input invalid");
    return false;
  }

  return true; 
}

function updateNavData(definitions) {
  navData.word = definitions[0].word;
  definitions[0].meanings.forEach(meaning => {
    navData.navItems.push(meaning.partOfSpeech);
    navData.meaningData.push(meaning.definitions);
  })
  console.log(navData);

}

function tabClickHandler() {

}

export default createHomePage;
