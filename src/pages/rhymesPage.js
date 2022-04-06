import createNavComponent, { RHYMES_INDEX } from "../components/navbar.js";
import { fetchRhymes } from "../fetchers/rhymes.js";
import router from "../lib/router.js";
import { fromTo } from "../tools/animation.js";
import { createRhymesView, createRhymeList } from "../views/rhymesView.js";
import { checkForInvalids } from "./homePage.js";

const rhymesData = {
  word: "",
  rhymesOptions: [],
  syllableCountList: {},
  onSubmit: submitHandler,
};

//This function can't be async
//Create the page's title in sync
//then append data async using another view function.
function createRhymesPage(targetWord) {
  resetData(targetWord);
  const rhymesView = renderViewWithNav();
  //If no parameter in URL, create resultless rhymesView.
  if (targetWord === undefined) return rhymesView;
  fetchAndRenderData(targetWord).then((result) => {
    rhymesView.root.appendChild(result);
    animateResult(result);
  });
  return rhymesView;
}

function renderViewWithNav() {
  //Create navbar and get height of it to adjust rhymes view element.
  const navbarHeight = createNavComponent(RHYMES_INDEX);
  const rhymesView = createRhymesView(rhymesData);
  rhymesView.root.style.top = `${navbarHeight}px`;
  return rhymesView;
}

function animateResult(result) {
  fromTo(result, { left: "100%" }, { left: "0%", duration: 0.3 });
}

function resetData(targetWord) {
  rhymesData.word = targetWord ? targetWord : "";
  rhymesData.rhymesOptions = [];
  rhymesData.syllableCountList = {};
}

async function fetchAndRenderData(word) {
  if (checkForInvalids(word) === false) return;
  try {
    const data = await fetchRhymes(word);
    populateData(data);
    const rhymesList = createRhymeList(rhymesData);
    return rhymesList;
  } catch (error) {
    console.error(error);
  }
}

function populateData(data) {
  data.forEach((rhyme) => {
    //Obj repesentation that keeps track of every syllable number and how often it's called
    const obj = createSyllableRepresentationObj(rhyme);
    rhymesData.syllableCountList[obj.amount] = obj;
    rhymesData.rhymesOptions.push({
      content: rhyme.word,
      syllables: rhyme.syllables,
    });
  });
  //function that groups words by how many syllables they have
  groupBySyllables();
}

//This method will create obj that will be unique based on amount of syllables
//And count the frequency of that syllable occuring.
//This allows to keep track of our data and render it in an organized way
function createSyllableRepresentationObj(rhyme) {
  let frequency = 0;
  //If property already exists, increment frequency.
  if (rhymesData.syllableCountList[rhyme.syllables] !== undefined) {
    frequency = ++rhymesData.syllableCountList[rhyme.syllables].frequency;
  }

  const obj = {
    amount: rhyme.syllables,
    frequency: frequency,
  };
  return obj;
}

function groupBySyllables() {
  //Go through each count list 1,2,3 and so on, go in the data and filter by
  //syllable according to the list's number.
  Object.keys(rhymesData.syllableCountList).forEach((key) => {
    const filteredArray = rhymesData.rhymesOptions.filter(
      (option) => option.syllables == key
    );
    rhymesData.syllableCountList[key].words = filteredArray;
  });
}

//Will fire when a searchTerm is submitted.
function submitHandler(input) {
  return function (e) {
    e.preventDefault();
    if (input.value !== rhymesData.word) {
      resetData();
    }
    router.navigateTo("rhymes", input.value);
  };
}

export default createRhymesPage;
