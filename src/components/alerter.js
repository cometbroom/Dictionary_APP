import { ALERT_UI_ID, TOGGLE_SHOW_CLASS } from "../constants.js";
import { callNowAndAfter } from "../tools/sleep.js";

const alertElement = document.getElementById(ALERT_UI_ID);

export const alertBelow = (text) => {
	alertElement.textContent = text;
	callNowAndAfter(() => {
		alertElement.classList.toggle(TOGGLE_SHOW_CLASS);
	}, 1500);
}