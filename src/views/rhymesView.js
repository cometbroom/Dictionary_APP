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
  const title = createElement("h2", { content: `${props.word}: ` });
  root.append(form, title);
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
  const parent = createElement("div");
  const syllableCount = props.syllableCountList;
  Object.keys(syllableCount).forEach((key) => {
    const title = createElement("h2", {
      content: `${syllableCount[key].amount} Syllables:`,
    });
    const list = createSyllableList(key, syllableCount);
    parent.append(title, list);
  });
  return parent;
};

function createSyllableList(key, syllableCount) {
  const ul = createElement("ul");
  syllableCount[key].words.forEach((options) => {
    const li = createElement("li", options);
    ul.appendChild(li);
  });

  return ul;
}
