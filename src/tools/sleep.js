export const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const callNowAndAfter = (whatToDo, ms) => {
	whatToDo();
	sleep(ms).then(whatToDo);
}	