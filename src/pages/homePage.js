import { alertBelow } from "../components/alerter.js";
import createNavComponent, { MEANING_INDEX } from "../components/navbar.js";
import { DEFINITION_TABS_ID, HOME_CONTAINER_CLASS } from "../constants.js";
import { fetchDefinition } from "../fetchers/definitions.js";
import router from "../lib/router.js";
import { C_TYPE } from "../tools/checkType.js";
import createDefinitionTabsView from "../views/homeTabsView.js";
import createHomeView from "../views/homeView.js";

const tabsData = {
  currentTab: 0,
  word: "",
  tabOptions: [],
  meaningData: [],
  onClick: tabClickHandler,
};

function createHomePage(wordInput, tabLocation) {
  const props = {
    onSubmit: btnClickHandler,
  };
  createNavComponent(MEANING_INDEX);
  resetTabsData();
  const homeView = createHomeView(props);
  if (tabLocation !== undefined) tabsData.currentTab = tabLocation;
  //Means there is / and something in URL so we take it and look up definition
  if (wordInput !== undefined) {
    searchWordAndUpdateData(wordInput).then((result) => {
      homeView.root.appendChild(result);
    });
  }
  return homeView;
}

//Submit word button handler.
function btnClickHandler(input) {
  return function (e) {
    e.preventDefault();
    if (input.value !== tabsData.word) {
      resetTabsData();
    }
    router.navigateTo("home", input.value);
  };
}

//Reset data for our definition view
function resetTabsData() {
  tabsData.currentTab = 0;
  tabsData.meaningData = [];
  tabsData.tabOptions = [];
  tabsData.word = "";
}

//This will check invalid inputs before sending it to API
async function searchWordAndUpdateData(word) {
  if (checkForInvalids(word) === false) return;
  const searchTerm = word.match(/\b[^\d\W]+\b/);
  try {
    const definitions = await fetchDefinition(searchTerm);
    updateNavData(definitions);
    return createTabsSection();
  } catch (error) {
    alertBelow(error.message);
  }
}

const checkForInvalids = (target) => {
  if (target === undefined) return false;
  if (target == "") {
    alertBelow("Please enter something");
    return false;
  }
  if (C_TYPE.isNumberedString(target)) {
    alertBelow("Numbers aren't allowed");
    return false;
  }
  if (!C_TYPE.isString) {
    alertBelow("Enter a string");
    return false;
  }
  const checkTerm = target.match(/\b[^\d\W]+\b/);
  if (checkTerm === null) {
    alertBelow("Input invalid");
    return false;
  }

  return true;
};

function updateNavData(definitions) {
  tabsData.word = definitions[0].word;
  if (tabsData.tabOptions?.length > 0) return;
  definitions[0].meanings.forEach((meaning) => {
    tabsData.tabOptions.push({
      content: `As ${meaning.partOfSpeech}`,
      onClick: tabClickHandler,
      data: meaning.definitions,
    });
  });
}

function createTabsSection() {
  const navView = createDefinitionTabsView(tabsData);
  return navView;
  //document.querySelector(`.${HOME_CONTAINER_CLASS}`).appendChild(navView);
}

function tabClickHandler() {
  tabsData.currentTab = this.value;
  updateDefinitionTabs();
}

function updateDefinitionTabs() {
  const defTabs = document.getElementById(DEFINITION_TABS_ID);
  const homeContainer = document.querySelector(`.${HOME_CONTAINER_CLASS}`);
  homeContainer.removeChild(defTabs);
  homeContainer.appendChild(createDefinitionTabsView(tabsData));
}

export default createHomePage;
