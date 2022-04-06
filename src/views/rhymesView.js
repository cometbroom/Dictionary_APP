import { RHYME_DESCRIPTION_ID } from "../constants.js";
import { createElement } from "../tools/DOMCreate.js";

export const createRhymesView = (props) => {
  const root = createElement("section", { class: "rhymes" });
  root.innerHTML = String.raw`
  <div id="${RHYME_DESCRIPTION_ID}" class="description">
    <h1>Rhyme Finder</h1>
    <p>Here you can find rhymes to your words.</p>
  </div>
  `;
  const form = createFormView(props);
  root.append(form);
  return { root };
};

const createFormView = (props) => {
  const form = createElement("form", { type: "submit", class: "rhymes" });
  const label = createElement("label", {
    content: "Which word would you like the rhymes for?",
  });
  const input = createElement("input", { type: "text" });
  const btn = createElement("button", { content: "Define", type: "submit" });

  //Feed input to the button
  form.addEventListener("submit", props.onSubmit(input));
  form.append(label, input, btn);
  return form;
};

export const createRhymeList = (props) => {
  const root = initializeDataView(props);
  const syllableCount = props.syllableCountList;

  //Iterate throught our syllabble list and create title for results.
  Object.keys(syllableCount).forEach((key) => {
    createDataView(syllableCount, key, root);
  });
  return root;
};

//Create initial data holder elements
function initializeDataView(props) {
  const root = createElement("div", { class: "rhymes-list" });
  const titleWord = createElement("h2", { content: `${props.word}: ` });
  root.appendChild(titleWord);
  return root;
}

//Create title and list of reset and add to our root
function createDataView(syllableCount, key, root) {
  const title = createElement("h2", {
    content: `${syllableCount[key].amount} Syllables:`,
  });
  const list = createSyllableList(key, syllableCount);
  root.append(title, list);
}

//Create list of rhyme word results
function createSyllableList(key, syllableCount) {
  const ul = createElement("ul");
  let separator = ", ";
  //For each rhyme word separator would be , except for last.
  syllableCount[key].words.forEach((options, index) => {
    if (index === syllableCount[key].frequency) separator = ".";
    appendWordView(options, separator, ul);
  });

  return ul;
}

function appendWordView(options, separator, ul) {
  options.content += separator;
  const li = createElement("li", options);
  ul.appendChild(li);
}
