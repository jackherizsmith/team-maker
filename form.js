const range = document.getElementById("genderInput");
const gender = document.getElementById("genderRatio");
const form = document.getElementById("form");
const mSection = document.getElementById("men");
const nmSection = document.getElementById("notMen");
const output = document.getElementById("results");
const possibilities = document.getElementById("possibilities");
let longestName = 0,
  numOfMen = 0;

const makeNewInputs = (ms, nms) => {
  let newMInputs = "",
    newNmInputs = "";
  for (let m = 0; m < ms; m++) {
    newMInputs += `
    <label for="m${m}" class="form__label">${m + 1}</label>
    <input id="m${m}" name="m${m}" class="form__input" type="text" required>
    `;
  }
  for (let nm = 0; nm < nms; nm++) {
    newNmInputs += `
    <label for="nm${nm}" class="form__label">${nm + 1}</label>
    <input id="nm${nm}" name="nm${nm}" class="form__input" type="text" required>
    `;
  }

  mSection.innerHTML =
    "<legend>Men</legend>" +
    newMInputs +
    `<button onClick="shift('m','up')" type="button">Shift up</button><button onClick="shift('m','down')" type="button">Shift down</button><button onClick="shift('m','rand')" type="button">Random</button>`;
  nmSection.innerHTML =
    "<legend>Not men</legend>" +
    newNmInputs +
    `<button onClick="shift('nm','up')" type="button">Shift up</button><button onClick="shift('nm','down')" type="button">Shift down</button><button onClick="shift('nm','rand')" type="button">Random</button>`;
};

const updateValue = () => {
  const ms = range.value;
  const nms = 16 - range.value;
  possibilities.textContent = calcPoss(ms, nms);
  gender.textContent = ms + " men and " + nms + " others";

  makeNewInputs(ms, nms);
};

const getInputs = (gender) => {
  return Array.from(gender.children)
    .filter((el) => el.tagName === "INPUT")
    .map((input) => input.value);
};

const rearrangeArray = (inputValues, dir) => {
  switch (dir) {
    case "up":
      inputValues.push(inputValues[0]);
      inputValues.splice(0, 1);
      break;
    case "down":
      inputValues.unshift(inputValues[inputValues.length - 1]);
      inputValues.splice(inputValues.length - 1, 1);
      break;
    default:
      for (let i = inputValues.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [inputValues[i], inputValues[j]] = [inputValues[j], inputValues[i]];
      }
  }
  return inputValues;
};

const shift = (gender, dir) => {
  const section = gender === "m" ? mSection : nmSection;
  const inputValues = rearrangeArray(getInputs(section), dir);
  const inputs = Array.from(section.children).filter(
    (el) => el.tagName === "INPUT"
  );
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = inputValues[i];
  }
};

const submitHandler = (e) => {
  e.preventDefault();

  const mArray = getInputs(mSection);
  const nmArray = getInputs(nmSection);
  numOfMen = mArray.length;

  const cohort = createCohort(mArray, nmArray);
  const teams = createTeams(cohort); // returns array
  const pairs = createPairs(cohort); // returns array
  output.innerHTML = printAll(cohort, teams, pairs);
};

form.addEventListener("submit", submitHandler);

updateValue();
