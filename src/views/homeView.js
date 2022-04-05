import { HOME_CONTAINER_CLASS } from "../constants.js";
import { createElement } from "../tools/DOMCreate.js";

function createHomeView(props) {
  const root = document.createElement('section');
  root.className = HOME_CONTAINER_CLASS;
  root.innerHTML = String.raw`
    <h2>Which word would you like to look up?</h2>
  `;
  root.appendChild(createFormView(props));

  return { root };
}

const createFormView = (props) => {
  const form = createElement("form", {type: "submit"});
  const input = createElement("input", {type: "text"});
  const btn = createElement("button", {content: "Define", type: "submit"});

  //Feed input to the button
  form.addEventListener('submit', props.onSubmit(input));
  form.append(input, btn);
  return form;
}


export default createHomeView;
