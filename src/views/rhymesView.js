import { createElement } from "../tools/DOMCreate.js";

const MIN_SYLLABLES = 1;
const MAX_SYLLABLES = 25;

export const createRhymesView = () => {
  const root = createElement("section", { class: "rhymes" });

  const title = createElement("h2", { content: "HI" });
  root.append(title);
  return { root };
};

export const createRhymeList = (props) => {
  const parent = createElement("div");
  for (let i = MIN_SYLLABLES; i <= MAX_SYLLABLES; ++i) {
    const title = createElement("h2", { content: `${i} Syllables:` });
    const list = createSyllableList(props, i);
    parent.append(title, list);
  }

  return parent;
};

function createSyllableList(props, syllableTarget) {
  if (props?.rhymesOptions === undefined) return;
  const ul = createElement("ul");
  props.rhymesOptions.forEach((options) => {
    if (options.syllables == syllableTarget) {
      const li = createElement("li", options);
      ul.appendChild(li);
    }
  });

  return ul;
}
