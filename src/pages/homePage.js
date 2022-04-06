import { alertBelow } from "../components/alerter.js";
import createNavComponent, { MEANING_INDEX } from "../components/navbar.js";
import {
  DEFINITION_RESULT_ID,
  DEFINITION_TABS_ID,
  HOME_CONTAINER_CLASS,
} from "../constants.js";
import { fetchDefinition } from "../fetchers/definitions.js";
import router from "../lib/router.js";
import { fromTo } from "../tools/animation.js";
import { C_TYPE } from "../tools/checkType.js";
import createDefinitionTabsView from "../views/homeTabsView.js";
import createHomeView from "../views/homeView.js";

/*
 * TODO: Loading screen when calling API.
 * TODO: Make footer.
 * TODO: Refactor this, rhymesPage
 * TODO: Opacity animation doesn't have to go for word search.
 */

//Data to keep track of current tab, current word, options and etc.
//Passed on to view.
const tabsData = {
  currentTab: 0,
  word: "",
  tabOptions: [],
  meaningData: [],
  onClick: tabClickHandler,
};

function createHomePage(wordInput, tabLocation) {
  resetTabsData();
  const homeView = renderViewWithNav({ onSubmit: btnClickHandler });

  if (tabLocation !== undefined) tabsData.currentTab = tabLocation;
  //Means there is / and something in URL so we take it and look up definition
  if (wordInput !== undefined) {
    searchWordAndUpdateData(wordInput).then((result) => {
      homeView.root.appendChild(result);
      animateResult(result);
    });
  }
  return homeView;
}

function renderViewWithNav(props) {
  //create fixed position nav component while getting height to readjust of view.
  const navbarHeight = createNavComponent(MEANING_INDEX);
  const homeView = createHomeView(props);
  homeView.root.style.top = `${navbarHeight}px`;
  return homeView;
}

function animateResult(result) {
  fromTo(result, { left: "100%" }, { left: "0%", duration: 0.3 });
}

//Submit word button handler.
function btnClickHandler(input) {
  return function (e) {
    e.preventDefault();
    //If same word is passed, then no need for reset.
    if (input.value !== tabsData.word) resetTabsData();
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
  //If word is invalid, don't send to API.
  if (checkForInvalids(word) === false) return;
  const searchTerm = word.match(/\b[^\d\W]+\b/);
  try {
    const definitions = await fetchDefinition(searchTerm);
    updateNavData(definitions);
    //Return tabs section as promise to append to DOM.
    return createTabsSection();
  } catch (error) {
    alertBelow(error.message);
    router.navigateTo("error", `"${word}" not found.`);
  }
}

//Checking for invalid inputs
export const checkForInvalids = (target, dontAlert = false) => {
  if (target === undefined) return false;
  if (target == "") {
    dontAlert || alertBelow("Please enter something");
    return false;
  }
  if (C_TYPE.isNumberedString(target)) {
    dontAlert || alertBelow("Numbers aren't allowed");
    return false;
  }
  if (!C_TYPE.isString) {
    dontAlert || alertBelow("Enter a string");
    return false;
  }
  const checkTerm = target.match(/\b[^\d\W]+\b/);
  if (checkTerm === null) {
    dontAlert || alertBelow("Input invalid");
    return false;
  }

  return true;
};

function updateNavData(definitions) {
  //Set word from api to our data
  tabsData.word = definitions[0].word;

  //If data isn't reset and already contain something, break
  if (tabsData.tabOptions?.length > 0) return;

  //Populate our data with our api results
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
}

function tabClickHandler() {
  tabsData.currentTab = this.value;
  updateDefinitionTabs();
}

function updateDefinitionTabs() {
  updateDefinitionView();
  const definitionResultView = document.getElementById(DEFINITION_RESULT_ID);
  const oldScrollHeight = definitionResultView.scrollHeight;
  animateView(oldScrollHeight, definitionResultView);
}

function updateDefinitionView() {
  //Get our home container element
  const homeContainer = document.querySelector(`.${HOME_CONTAINER_CLASS}`);
  //Get definition tabs element
  const defTabs = document.getElementById(DEFINITION_TABS_ID);
  //Remove old definition tabs view and append newly created one.
  homeContainer.removeChild(defTabs);
  const defTabsNew = createDefinitionTabsView(tabsData);
  homeContainer.appendChild(defTabsNew);
  
  defTabsNew.scrollIntoView({ behavior: "smooth" });
}

function animateView(oldScrollHeight, defTabsNew) {
  fromTo(
    defTabsNew,
    { height: `${oldScrollHeight}px` },
    { height: `${defTabsNew.scrollHeight}px`, duration: 0.2 }
  );
}

export default createHomePage;
