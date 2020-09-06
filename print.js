const printCohort = (cohort) => {
  let results = `<section><h3>The cohort</h3><div class="tooltip"><button class="copy" onclick="copy('cohort')" onmouseout="clearTip('cohort')"><span class="tooltiptext" id="cohortTip">Click to copy</span>Copy markdown</button></div>
  <pre id="cohort"># The cohort
  
| Name |
| ---- |`;
  for (let person = 0; person < cohort.length; person++) {
    results += `
| ${cohort[person]} |`;
  }
  results += "</pre></section>";
  return results;
};

const printTeams = (teamSets) => {
  let results =
    `<section><h3>Project teams and code reviews</h3><div class="tooltip"><button class="copy" onclick="copy('teams')" onmouseout="clearTip('teams')"><span class="tooltiptext" id="teamsTip">Click to copy</span>Copy this markdown</button></div>`;
  results +=
    numOfMen === 7
      ? `<div class="warning"><p><strong>Please be aware that Team 4 in sets 1 and 2 are all dudes:</strong></p>
  <p><strong>${teamSets[0][3].join(
    ", "
  )}</strong> in set 1 and <strong>${teamSets[1][3].join(
          ", "
        )}</strong> in set 2.</p></div>`
      : numOfMen === 8
      ? `<div class="warning"><p><strong>Please be aware that Team 4 in sets 4 and 5 are all dudes:</strong></p>
    <p><strong>${teamSets[3][3].join(
      ", "
    )}</strong> and <strong>${teamSets[4][3].join(
          ", "
        )}</strong>.</p></div>`
      : numOfMen === 9
      ? `<div class="warning"><p><strong>Please be aware that there are two teams with three dudes:</strong></p>
    <p><strong>${teamSets[2][2].join(
      ", "
    )}</strong> in set 3 and <strong>${teamSets[3][3].join(
          ", "
        )}</strong> in set 4.</p>
    <p>You should also know that Team 4 in sets 1, 2 and 5 are all dudes.</p></div>`
      : numOfMen === 10
      ? `<div class="warning"><p><strong>Please be aware that there are three teams with three dudes:</strong></p>
    <p><strong>${teamSets[2][0].join(
      ", "
    )}</strong> and <strong>${teamSets[2][2].join(
          ", "
        )}</strong> in set 3 and <strong>${teamSets[4][0].join(
          ", "
        )}</strong> in set 5.</p>
    <p>You should also know that Team 4 in sets 1, 2, 4 and 5 are all dudes.</p></div>`
      : numOfMen > 10
      ? `<div class="warning"><p>Please be aware that there are a few teams with three dudes, and some are all dudes. Perhaps rearrange names until this works well for everyone.</p></div>`
      : "";
  results += `<pre id="teams"># Project teams and code reviews
## First half project teams
  
| Team set | Team 1 | Team 2 | Team 3 | Team 4 |
| -------- | ------ | ------ | ------ | ------ |`;
  for (let teamSet = 0; teamSet < teamSets.length; teamSet++) {
    results += `
| ${teamSet + 1} `; //| ${topics[teamSet]} `;
    for (let team = 0; team < teamSets[teamSet].length; team++) {
      results += `| ${teamSets[teamSet][team].join(", ")} `;
    }
    results += `|`;
  }
  results += `
  
## Code reviewing`;
  let teamCount = 0;
  for (let topic = 0; topic < topics.length - 1; topic++) {
    results += `

**${topics[topic]} week**
    
| Team 1 | Team 2 | Mentors |
| ------ | ------ | ------- |`;
    if (topics[topic] === "Teamwork" || topics[topic] === "Node") {
      results += `
| ${teamSets[teamCount][0].join(", ")} | ${teamSets[teamCount][1].join(
        ", "
      )} | ${
        topics[topic - 1] ? topics[topic - 1] : topics[topics.length - 2]
      } |
| ${teamSets[teamCount][2].join(", ")} | ${teamSets[teamCount][3].join(
        ", "
      )} | ${topics[topic]} |`;
      teamCount++;
    } else {
      results += `
| ${teamSets[teamCount][0].join(", ")} | ${teamSets[teamCount][1].join(
        ", "
      )} | ${
        topics[topic - 1] ? topics[topic - 1] : topics[topics.length - 2]
      } |
| ${teamSets[teamCount][2].join(", ")} | ${teamSets[teamCount][3].join(
        ", "
      )} | ${topics[topic]} |

**${topics[topic + 1]} week**

| Team 1 | Team 2 | Mentors |
| ------ | ------ | ------- |
| ${teamSets[teamCount][0].join(", ")} | ${teamSets[teamCount][2].join(
        ", "
      )}| ${topics[topic + 1]}|
| ${teamSets[teamCount][1].join(", ")} | ${teamSets[teamCount][3].join(
        ", "
      )}| ${topics[topic] ? topics[topic] : topics[topics.length - 2]} |`;
      topic++;
    }
  }
  results += `</pre></section>`;
  return results;
};

const printPairs = (pairs) => {
  let results = `<section><h3>Workshop pairs</h3><div class="tooltip"><button class="copy" onclick="copy('pairs')" onmouseout="clearTip('pairs')"><span class="tooltiptext" id="pairsTip">Click to copy</span>Copy markdown</button></div>`;
  results += `<pre id="pairs"># Worskhop pairs`;
  for (let week = 0; week < pairs.length; week++) {
    results += `

## Week ${week < readingWeek ? week + 1 : week + 2}: ${topics[week]}`;
    for (let segment = 0; segment < segments.length; segment++) {
      results += `
**${segments[segment]}**

| Person 1 | Person 2 |
| -------- | -------- |`;
      for (let pair = 0; pair < pairs[week][segment].length; pair++) {
        results += `
| ${pairs[week][segment][pair][0]} | ${pairs[week][segment][pair][1]} |`;
      }
      results += `
`;
    }
  }
  results += "</pre></section>";
  return results;
};

const printAll = (cohort, teams, pairs, numOfMen) => {
  longestName = cohort.reduce((a, b) => (a.length > b.length ? a : b)).length;

  let results = "<h2>Results</h2>";
  results += printCohort(cohort);
  results += printTeams(teams, numOfMen);
  results += printPairs(pairs);
  return results;
};
