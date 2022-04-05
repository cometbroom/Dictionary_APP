import createNavComponent from "../components/navbar.js";
import { fetchRhymes } from "../fetchers/rhymes.js";
import router from "../lib/router.js";
import { createRhymesView, createRhymeList } from "../views/rhymesView.js";

const rhymesData = {
  word: "",
  rhymesOptions: [],
  syllableCountList: {},
};

//This function can't be async
//Create the page's title in sync
//then append data async using another view function.
function createRhymesPage(targetWord) {
  createNavComponent();
  resetData();
  rhymesData.word = targetWord;
  const rhymesView = createRhymesView(rhymesData);
  fetchAndRenderData(targetWord)
    .then((result) => {
      rhymesView.root.appendChild(result);
    })
    .catch((error) => {
      router.navigateTo("error", error.message);
    });
  return rhymesView;
}

function resetData() {
  rhymesData.word = "";
  rhymesData.rhymesOptions = [];
  rhymesData.syllableCountList = {};
}

async function fetchAndRenderData(word) {
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
    const obj = createSyllableRepresentationObj(rhyme);
    rhymesData.syllableCountList[obj.amount] = obj;
    rhymesData.rhymesOptions.push({
      content: rhyme.word,
      syllables: rhyme.syllables,
    });
  });
  groupBySyllables();
}

//This method will create obj that will be unique based on amount of syllables
//And count the frequency of that syllable occuring.
function createSyllableRepresentationObj(rhyme) {
  let frequency = 1;
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
  Object.keys(rhymesData.syllableCountList).forEach((key) => {
    const filteredArray = rhymesData.rhymesOptions.filter(
      (option) => option.syllables == key
    );
    rhymesData.syllableCountList[key].words = filteredArray;
  });
}

export default createRhymesPage;
