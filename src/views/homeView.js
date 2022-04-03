import { createElement } from "../tools/DOMCreate.js";

function createHomeView(props) {
  const root = document.createElement('section');
  root.className = 'home-container';
  root.innerHTML = String.raw`
    <h3>Which word would you like to look up?</h3>
  `;
  root.appendChild(createFormView(props));

  return { root };
}

const createFormView = (props) => {
  const form = createElement("form", {type: "submit"});
  const input = createElement("input", {type: "text"});
  const btn = createElement("button", {content: "Show me!", type: "submit"});

  if (props?.onSubmit) {
    //Feed input to the button
    form.addEventListener('submit', props.onSubmit(input));
  }
  form.append(input, btn);
  return form;
}


export default createHomeView;
