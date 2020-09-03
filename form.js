const range = document.getElementById("genderInput");
const gender = document.getElementById("genderRatio");
const form = document.getElementById("form");
const mSection = document.getElementById("men");
const fSection = document.getElementById("women");
const output = document.getElementById("results");
let longestName = 0,
  numOfMen = 0;

const makeNewInputs = (ms, fs) => {
  let newMInputs = "",
    newFInputs = "";
  for (let m = 0; m < ms; m++) {
    newMInputs += `
    <label for="m${m}" class="form__label">${m + 1}</label>
    <input id="m${m}" name="m${m}" class="form__input" required>
    `;
  }
  for (let f = 0; f < fs; f++) {
    newFInputs += `
    <label for="f${f}" class="form__label">${f + 1}</label>
    <input id="f${f}" name="f${f}" class="form__input" required>
    `;
  }

  mSection.innerHTML = "<legend>Men</legend>" + newMInputs;
  fSection.innerHTML = "<legend>Womxn</legend>" + newFInputs;
};

const updateValue = () => {
  const ms = range.value;
  const fs = 16 - range.value;

  gender.textContent = ms + " men and " + fs + " women";

  makeNewInputs(ms, fs);
};

const submitHandler = (e) => {
  e.preventDefault();

  const mArray = Array.from(mSection.children)
    .filter((el) => el.tagName === "INPUT")
    .map((input) => input.value);
  const fArray = Array.from(fSection.children)
    .filter((el) => el.tagName === "INPUT")
    .map((input) => input.value);
  numOfMen = mArray.length;

  const cohort = createCohort(mArray, fArray);
  const teams = createTeams(cohort); // returns array
  const pairs = createPairs(cohort); // returns array
  output.innerHTML = printAll(cohort, teams, pairs, numOfMen);
};

form.addEventListener("submit", submitHandler);

updateValue();
