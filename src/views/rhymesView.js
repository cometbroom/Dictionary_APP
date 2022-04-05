import { createElement } from "../tools/DOMCreate.js";

export const createRhymesView = (props) => {
  const root = createElement("section", { class: "rhymes" });
  root.innerHTML = "";
  const title = createElement("h2", { content: `${props.word}: ` });
  root.append(title);
  return { root };
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
