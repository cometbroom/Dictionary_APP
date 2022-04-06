import { HOME_CONTAINER_CLASS, SITE_DESCRIPTION_ID } from "../constants.js";
import { createElement } from "../tools/DOMCreate.js";

function createHomeView(props) {
  const root = document.createElement("section");
  root.className = HOME_CONTAINER_CLASS;
  root.innerHTML = String.raw`
    <div id="${SITE_DESCRIPTION_ID}" class="description">
      <h1>Word Analyzer</h1>
      <p>
        Word analyzer is a website that allows you to analyze words further.
        You can search words to find their definitions, usages and more.
        Up in the <a href="#rhymes">Rhymes</a> section, you can also find words that rhyme with your 
        current ones or enter new words.
      </p>
    </div>
    <h2>Which word would you like to look up?</h2>
  `;
  root.appendChild(createFormView(props));

  return { root };
}

const createFormView = (props) => {
  const form = createElement("form", { type: "submit" });
  const input = createElement("input", { type: "text" });
  const btn = createElement("button", { content: "Define", type: "submit" });

  //Feed input to the button
  form.addEventListener("submit", props.onSubmit(input));
  form.append(input, btn);
  return form;
};

export default createHomeView;
