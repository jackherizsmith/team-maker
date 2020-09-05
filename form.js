const range = document.getElementById("genderInput");
const gender = document.getElementById("genderRatio");
const form = document.getElementById("form");
const mSection = document.getElementById("men");
const nmSection = document.getElementById("notMen");
const output = document.getElementById("results");
const possibilities = document.getElementById("possibilities")
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

  mSection.innerHTML = "<legend>Men</legend>" + newMInputs + `<button onClick="randomise('m')" type="button">Randomise</button>`;
  nmSection.innerHTML = "<legend>Not men</legend>" + newNmInputs + `<button onClick="randomise('nm')" type="button">Randomise</button>`;
};

const updateValue = () => {
  const ms = range.value;
  const nms = 16 - range.value;
  possibilities.textContent = calcPoss(ms,nms);
  gender.textContent = ms + " men and " + nms + " others";

  makeNewInputs(ms, nms);
}

const getInputs = (gender) => {
  return arr = Array.from(gender.children).filter((el) => el.tagName === "INPUT").map((input) => input.value);
}

const randomise = (gender) => {
  inputValues = gender === "m" ? getInputs(mSection) : getInputs(nmSection);
  console.log("randomise -> inputValues", inputValues)
}

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
