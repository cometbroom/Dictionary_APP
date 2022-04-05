import createNavComponent from "../components/navbar.js";
import { fetchRhymes } from "../fetchers/rhymes.js";
import { createRhymesView, createRhymeList } from "../views/rhymesView.js";

const rhymesData = {
  rhymesOptions: [],
};
//This function can't be async
//Create the page's title in sync
//then append data async using another view function.
function createRhymesPage(targetWord) {
  createNavComponent();
  const rhymesView = createRhymesView(rhymesData);
  fetchAndRenderData(targetWord).then((result) => {
    rhymesView.root.appendChild(result);
  });
  return rhymesView;
}

async function fetchAndRenderData(word) {
  try {
    const data = await fetchRhymes(word);
    populateData(data);
    const rhymesList = createRhymeList(rhymesData);
    return rhymesList;
  } catch (error) {
    console.log(error.message);
  }
}

function populateData(data) {
  data.forEach((rhyme) => {
    rhymesData.rhymesOptions.push({
      content: rhyme.word,
      syllables: rhyme.syllables,
    });
  });
}

export default createRhymesPage;
