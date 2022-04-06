export const createElement = (tag, options = null) => {
  const element = document.createElement(tag);
  if (options?.content) element.textContent = options.content;
  if (options?.innerHTML) element.innerHTML = options.innerHTML;
  if (options?.append) element.appendChild(options.append);
  if (options?.id) element.id = options.id;
  if (options?.value) element.value = options.value;
  if (options?.type) element.type = options.type;
  if (options?.class) element.classList.add(options.class);
  if (options?.onClick) element.addEventListener("click", options.onClick);
  return element;
};
