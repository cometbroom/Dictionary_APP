import { alertBelow } from '../components/alerter.js';
import { DEFINITION_TABS_ID, HOME_CONTAINER_QUERY } from '../constants.js';
import { fetchDefinition } from '../fetchers/definitions.js';
import router from '../lib/router.js';
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
  if (tabLocation !== undefined) {
    searchWordAndUpdateData(tabLocation);
  }
  const props = {
    onSubmit: btnClickHandler,
  }
  const homeView = createHomeView(props);

  return homeView;
}

function btnClickHandler(input) {
  return function(e) {
    e.preventDefault();
    if (input.value !== navData.word) {
      resetNavData();
    }
    router.navigateTo('home', input.value);
  }
}

function resetNavData() {
  navData.currentTab = 0;
  navData.meaningData = [];
  navData.navItems = [];
  navData.word = "";
}

async function searchWordAndUpdateData(word) {
  if (checkForInvalids(word) === false) return;
  const searchTerm = word.match(/\b[^\d\W]+\b/);
  try {
    const definitions = await fetchDefinition(searchTerm);
    updateNavData(definitions);
    createTabsSection();
  } catch (error) {
      alertBelow(error.message);
  }

}

function createTabsSection() {
  const navView = createDefinitionTabsView(navData);
  document.querySelector(HOME_CONTAINER_QUERY).appendChild(navView);
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
}

function updateDefinitionTabs() {
  const defTabs = document.getElementById(DEFINITION_TABS_ID);
  const homeContainer = document.querySelector(HOME_CONTAINER_QUERY);
  homeContainer.removeChild(defTabs);
  homeContainer.appendChild(createDefinitionTabsView(navData));
}

function tabClickHandler() {
  navData.currentTab = this.value;
  updateDefinitionTabs();
}

export default createHomePage;
