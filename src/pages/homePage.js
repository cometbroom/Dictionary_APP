import { alertBelow } from '../components/alerter.js';
import { fetchDefinition } from '../fetchers/definitions.js';
import { C_TYPE } from '../tools/checkType.js';
import createHomeView from '../views/homeView.js';

function createHomePage() {
  const props = {
    onSubmit: btnClickHandler,
  }
  return createHomeView(props);
}

const checkForInvalids = (target) => {
  if (target === undefined) return false;
  if (target == "") {
    alertBelow("Please enter something");
    return false;
  }
  if(C_TYPE.isNumberedString(target)) {
    alertBelow("Numbers aren't allowed");
    return false;
  }
  if(!C_TYPE.isString) {
    alertBelow("Enter a string");
    return false;
  }
  const checkTerm = target.match(/\b[^\d\W]+\b/);
  if (checkTerm === null) {
    alertBelow("Input invalid");
    return false;
  }

  return true; 
}

function btnClickHandler(input) {
  return async function(e) {
    e.preventDefault();
    if (checkForInvalids(input.value) === false) return;
    const searchTerm = input.value.match(/\b[^\d\W]+\b/);
    try {
      const definitions = await fetchDefinition(searchTerm);
      console.log(definitions);
    } catch (error) {
        alertBelow(error.message);
    }
  }
}

export default createHomePage;
