export const createElement = (tag, options = null) => {
  const element = document.createElement(tag);
	if (options?.content) element.textContent = options.content;
	if (options?.id) element.id = options.id;
	if (options?.value) element.value = options.value;
	if (options?.type) element.type = options.type;
  return element;
}

