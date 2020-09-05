const printCohort = (cohort) => {
  let results = `<section><h3>The Cohort</h3><div id="cohort">
  <pre>| Name |
| ---- |`;
  for (let person = 0; person < cohort.length; person++) {
    results += `
| ${cohort[person]} |`;
  }
  results += "</pre></div></section>";
  return results;
};

const printTeams = (teamSets) => {
  let results = `<section><h3>Project teams</h3><div id="projectTeams"><pre>| Team set | Team 1 | Team 2 | Team 3 | Team 4 |
| -------- | ------ | ------ | ------ | ------ |`;
  for (let teamSet = 0; teamSet < teamSets.length; teamSet++) {
    results += `
| ${teamSet + 1} `;
    for (let team = 0; team < teamSets[teamSet].length; team++) {
      results += `| ${teamSets[teamSet][team].join(", ")} `;
    }
    results += `|`;
  }
  results += "</div>";
  results +=
    numOfMen === 7
      ? `<p><strong>Please be aware that there are two all male teams:</strong></p>
  <p><strong>${teamSets[0][3].join(
    ", "
  )}</strong> in set 1 and <strong>${teamSets[1][3].join(
          ", "
        )}</strong> in set 2.</p>`
      : numOfMen === 8
      ? `<p><strong>Please be aware that there are two all male teams:</strong></p>
    <p><strong>${teamSets[3][0].join(
      ", "
    )}</strong> in set 4 and <strong>${teamSets[4][3].join(
          ", "
        )}</strong> in set 5.</p>`
      : numOfMen === 9
      ? `<p><strong>Please be aware that there are two teams with three men:</strong></p>
    <p><strong>${teamSets[2][2].join(
      ", "
    )}</strong> in set 3 and <strong>${teamSets[3][0].join(
          ", "
        )}</strong> in set 4.</p>
    You should also know that you have three all male teams, in sets 1,2, and 5.`
      : numOfMen === 10
      ? `<p><strong>Please be aware that there are three teams with three men:</strong></p>
    <p><strong>${teamSets[2][0].join(
      ", "
    )}</strong> and <strong>${teamSets[2][2].join(
          ", "
        )}</strong> in set 3 and <strong>${teamSets[4][0].join(
          ", "
        )}</strong> in set 4.</p>
    <p>You should also know that you have four all male teams, in sets 1,2, 4 and 5. </p>`
      : numOfMen > 10
      ? `<p>Please be aware that there are a few teams with three men, and some are all men. Perhaps rearrange names until you are happy.</p>`
      : "";
  results += "</section>";
  // here is the ugliest thing ever written
  results += '<section><h3>Code reviews</h3><div id="codeReview">';
  let teamCount = 0;
  for (let topic = 0; topic < topics.length - 1; topic++) {
    results += `<pre>

**${topics[topic]} Week**
    
| Team 1 | Team 2 | Mentors |
| ---- | ------ | ------ | ------- |`;
    if (topics[topic] === "Teamwork" || topics[topic] === "Node") {
      results += `
| ${teamSets[teamCount][0].join(", ")} | ${teamSets[teamCount][1].join(
        ", "
      )} | ${
        topics[topic - 1] ? topics[topic - 1] : topics[topics.length - 1]
      } |
| ${teamSets[teamCount][2].join(", ")} | ${teamSets[teamCount][3].join(
        ", "
      )} | ${topics[topic]} |</pre>`;
      teamCount++;
    } else {
      results += `
| ${teamSets[teamCount][0].join(", ")} | ${teamSets[
        teamCount
      ][1].join(", ")} | ${
        topics[topic - 1] ? topics[topic - 1] : topics[topics.length - 1]
      } |
| ${teamSets[teamCount][2].join(", ")} | ${teamSets[
        teamCount
      ][3].join(", ")} | ${topics[topic]} |</pre>
<pre>

**${topics[topic + 1]} Week**

| Team 1 | Team 2 | Mentors |
| ------ | ------ | ------- |
| ${teamSets[teamCount][0].join(", ")} | ${teamSets[teamCount][2].join(
        ", "
      )}| ${topics[topic + 1]}|
| ${teamSets[teamCount][1].join(", ")} | ${teamSets[teamCount][3].join(
        ", "
      )}| ${topics[topic] ? topics[topic] : topics[topics.length - 1]} |</pre>`;
      topic++;
    }
  }
  results += `</div></section>`;
  return results;
};

const printPairs = (pairs) => {
  let results = '<section><h3>Workshop pairs</h3><div id="workshopPairs">';
  results += `<pre># Worskhop pairs`
  for (let week = 0; week < pairs.length; week++) {
    results += `

## Week ${week < readingWeek ? week + 1 : week + 2}: ${
      topics[week]
    }`;
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
  results += "</pre></div></section>";
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
