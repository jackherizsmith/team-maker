const range = document.getElementById("genderInput");
const gender = document.getElementById("genderRatio");
// const collapsibles = document.getElementsByClassName("collapsible")
const tooltips = document.getElementsByClassName("tooltiptext");
const form = document.getElementById("people");
const mSection = document.getElementById("men");
const nmSection = document.getElementById("notMen");
const output = document.getElementById("results");
const possibilities = document.getElementById("possibilities");
let longestName = 0,
  numOfMen = 0;

const copy = (id) => {
  const copyText = document.getElementById(id).textContent;
  const input = document.createElement("textarea");
  input.innerHTML = copyText;
  document.body.appendChild(input);
  input.select();
  const result = document.execCommand("copy");
  document.body.removeChild(input);
  const tooltip = document.getElementById(id + "Tip");
  tooltip.innerHTML = "Copied!";
  return result;
};

const clearTip = (id) => {
  const tooltip = document.getElementById(id + "Tip");
  tooltip.innerHTML = "Click to copy";
};

const fillCourseInfo = () => {
  let results = "";
  for (let topic = 0; topic < topics.length; topic++) {
    results += `<label for="topic${topic}">Topic ${topic + 1}</label>
    <input id="topic${topic}" name="topic${topic}" type="text" value="${
      topics[topic][0]
    }" aria-labelledBy="topic${topic}">`;
    results += `<select name="teamForTopic${topic}" id="team${topic}" aria-labelledBy="topic${topic}">`;
    for (let team = 0; team < 6; team++) {
      results += `<option value="${team}" ${
        topics[topic][1] === team ? "selected" : ""
      }>${team < 5 ? team + 1 : "N/A"}</option>`;
    }
    results += `</select>`;
  }
  results += `<fieldset id="readingWeekInput"><legend>Reading week</legend>`;
  for (let week = 0; week < topics.length; week++) {
    results += `<div class="weekRadios"><input type="radio" id="week${week}" name="reading-week" value="${week}" ${
      week === readingWeek ? "checked" : ""
    }><label for="wk${week}">${week + 1}</label></div>`;
  }
  results += "</fieldset>";
  return results;
};

const handleCourseInput = (e) => {
  const id = e.target.id;
  const targetNum = id.charAt(id.length-1);
  const value = e.target.value;
  switch (id.slice(0, -1)) {
    case "topic":
      topics[targetNum][0] = value;
      break;
    case "team":
      topics[targetNum][1] = value;
      break;
    case "week":
      readingWeek = value;
      break;
    default:
      break;
  }
};

// collapsibles[0].addEventListener("click", e => {
//   e.target.classList.toggle("active");
//   const content = e.target.nextElementSibling;
//   if (content.style.display === "block") {
//     content.style.display = "none";
//   } else {
//     content.style.display = "block";
//   }
// });

const makeNewInputs = (ms, nms) => {
  let newMInputs = "",
    newNmInputs = "";
  for (let m = 0; m < ms; m++) {
    newMInputs += `
    <label for="m${m}">${m + 1}</label>
    <input id="m${m}" name="m${m}" type="text" value="m" required>
    `;
  }
  for (let nm = 0; nm < nms; nm++) {
    newNmInputs += `
    <label for="nm${nm}">${nm + 1}</label>
    <input id="nm${nm}" name="nm${nm}" type="text" value="f" required>
    `;
  }

  mSection.innerHTML =
    `<legend>Dudes</legend><button onClick="shift('m','up')" type="button">Shift up</button>` +
    newMInputs +
    `<button onClick="shift('m','down')" type="button">Shift down</button><button onClick="shift('m','rand')" type="button" class="random">Random</button>`;
  nmSection.innerHTML =
    `<legend>Not dudes</legend><button onClick="shift('nm','up')" type="button">Shift up</button>` +
    newNmInputs +
    `<button onClick="shift('nm','down')" type="button">Shift down</button><button onClick="shift('nm','rand')" type="button" class="random">Random</button>`;
};

const updateValue = () => {
  const ms = range.value;
  const nms = 16 - range.value;
  possibilities.textContent = calcPoss(ms, nms);
  gender.textContent = ms + " dudes and " + nms + " non dudes";

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
  if (e) e.preventDefault();

  const mArray = getInputs(mSection);
  const nmArray = getInputs(nmSection);
  numOfMen = mArray.length;

  const cohort = createCohort(mArray, nmArray);
  const teams = createTeams(cohort);
  const pairs = createPairs(cohort);
  output.innerHTML = printAll(cohort, teams, pairs);
  const courseInfo = document.getElementById("course");
  courseInfo.innerHTML = fillCourseInfo();
  Array.from(courseInfo.children)
    .filter((el) => el.tagName === "INPUT" || "SELECT")
    .forEach((el) => {
      el.addEventListener("input", handleCourseInput);
      el.addEventListener("keyup", e => {
        if (e.key === "Enter") submitHandler();
      });
    });
};

form.addEventListener("submit", submitHandler);

updateValue();
