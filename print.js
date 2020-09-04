const printCohort = (cohort) => {
  let results = `<hr><section><h3>The Cohort</h3><div id="cohort">
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
  let results = `<hr><section><h3>Project teams</h3><div id="projectTeams"><pre>| Team set | Team 1 | Team 2 | Team 3 | Team 4 |
| -------- | ------ | ------ | ------ | ------ |`;
  for (let teamSet = 0; teamSet < teamSets.length; teamSet++) {
    results += `
| ${teamSet + 1} `;
    for (let team = 0; team < teamSets[teamSet].length; team++) {
      results += `| ${teamSets[teamSet][team][0]}, ${teamSets[teamSet][team][1]}, ${teamSets[teamSet][team][2]} & ${teamSets[teamSet][team][3]} `;
    }
    results += `|`;
  }
  results += "</div>";
  results +=
    numOfMen === 9
      ? `<p><strong>Please be aware that there are two teams with three men:</strong></p>
    <p><strong>${teamSets[2][2][0]}, ${teamSets[2][2][1]}, ${teamSets[2][2][2]} & ${teamSets[2][2][3]}</strong> in set 3 and <strong>${teamSets[3][0][0]}, ${teamSets[3][0][1]}, ${teamSets[3][0][2]} & ${teamSets[3][0][3]}</strong> in set 4.</p>
    You should also know that you have three all male teams, in sets 1,2, and 5.`
      : numOfMen === 10
      ? `<p><strong>Please be aware that there are three teams with three men:</strong></p>
    <p><strong>${teamSets[2][0][0]}, ${teamSets[2][0][1]}, ${teamSets[2][0][2]} & ${teamSets[2][0][3]}</strong> and <strong>${teamSets[2][2][0]}, ${teamSets[2][2][1]}, ${teamSets[2][2][2]} & ${teamSets[2][2][3]}</strong> in set 3 and <strong>${teamSets[4][0][0]}, ${teamSets[4][0][1]}, ${teamSets[4][0][2]} & ${teamSets[4][0][3]}</strong> in set 4.</p>
    <p>You should also know that you have four all male teams, in sets 1,2, 4 and 5. </p>`
      : numOfMen > 10
      ? `<p>Please be aware that there are a few teams with three men, and some are all men. Perhaps rearrange names until you are happy.</p>`
      : "";
  results += "</section>";
  // here is the ugliest thing ever written
  results += '<hr><section><h3>Code reviews</h3><div id="codeReview">';
  let teamCount = 0;
  for (let topic = 0; topic < topics.length - 1; topic++) {
    results += `<pre>| Week | Team 1 | Team 2 | Mentors |
| ---- | ------ | ------ | ------- |`;
    if (topics[topic] === "Teamwork" || topics[topic] === "Node") {
      results += `
| ${topics[topic]} | ${teamSets[teamCount][0].join(", ")} | ${teamSets[
        teamCount
      ][1].join(", ")} | ${
        topics[topic - 1] ? topics[topic - 1] : topics[topics.length - 1]
      } |
|  | ${teamSets[teamCount][2].join(", ")} | ${teamSets[teamCount][3].join(
        ", "
      )} | ${topics[topic]} |</pre><br>`;
      teamCount++;
    } else {
      results += `
| ${topics[topic]} | ${teamSets[teamCount][0].join(", ")} | ${teamSets[
        teamCount
      ][1].join(", ")} | ${
        topics[topic - 1] ? topics[topic - 1] : topics[topics.length - 1]
      } |
|  | ${teamSets[teamCount][2].join(", ")} | ${teamSets[teamCount][3].join(
        ", "
      )} | ${topics[topic]} |</pre>
<pre>| Week | Team 1 | Team 2 | Mentors |
| ---- | ------ | ------ | ------- |
| ${topics[topic + 1]}| ${teamSets[teamCount][0].join(", ")} | ${teamSets[
        teamCount
      ][2].join(", ")}| ${topics[topic + 1]}|
|  | ${teamSets[teamCount][1].join(", ")} | ${teamSets[teamCount][3].join(
        ", "
      )}| ${
        topics[topic] ? topics[topic] : topics[topics.length - 1]
      } |</pre>`;
      topic++;
    }
  }
  results += `</div></section>`;
  return results;
};

const printPairs = (pairs) => {
  let results = '<hr><section><h3>Workshop pairs</h3><div id="workshopPairs">';
  for (let week = 0; week < pairs.length; week++) {
    results += `<pre>Week ${week < readingWeek ? week + 1 : week + 2}: ${topics[week]}`;
    for (let segment = 0; segment < segments.length; segment++) {
      results += `
${segments[segment]}

| Person 1 | Person 2 |
| -------- | -------- |`;
      for (let pair = 0; pair < pairs[week][segment].length; pair++) {
        results += `
| ${pairs[week][segment][pair][0]} | ${pairs[week][segment][pair][1]} |`;
      }
      results += `
`;
    }
    results += "</pre>";
  }
  results += "</div></section>";
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
