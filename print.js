const printCohort = (cohort) => {
  let results = `<hr><h3>The Cohort</h3> | Name |<br>
  | ---- |<br>`;
  for (let person = 0; person < cohort.length; person++) {
    results += `| ${cohort[person]} |<br>`;
  }
  results += "<br><br>";
  return results;
};

const printTeams = (teamSets, numOfMen) => {
  let results = `<hr>
    <h3>Project teams</h3>
    | Team set | Team 1 | Team 2 | Team 3 | Team 4 |<br>
    | -------- | ------ | ------ | ------ | ------ |<br>`;
  for (let teamSet = 0; teamSet < teamSets.length; teamSet++) {
    results += `
        | ${teamSet + 1} `;
    for (let team = 0; team < teamSets[teamSet].length; team++) {
      results += `| ${teamSets[teamSet][team][0]}, ${teamSets[teamSet][team][1]}, ${teamSets[teamSet][team][2]} & ${teamSets[teamSet][team][3]} `;
    }
    results += `|<br>`;
  }
  results += "<br>";
  results +=
    numOfMen === 9
      ? `
    Please be aware that there are two teams with three men:<br>
    ${teamSets[2][2][0]}, ${teamSets[2][2][1]}, ${teamSets[2][2][2]} & ${teamSets[2][2][3]} in set 3 and ${teamSets[3][0][0]}, ${teamSets[3][0][1]}, ${teamSets[3][0][2]} & ${teamSets[3][0][3]} in set 4.<br><br>
    You should also know that you have three all male teams, in sets 1,2, and 5. <br><br>
    `
      : numOfMen === 10
      ? `
    Please be aware that there are three teams with three men:<br>
    ${teamSets[2][0][0]}, ${teamSets[2][0][1]}, ${teamSets[2][0][2]} & ${teamSets[2][0][3]} and ${teamSets[2][2][0]}, ${teamSets[2][2][1]}, ${teamSets[2][2][2]} & ${teamSets[2][2][3]} in set 3 and ${teamSets[4][0][0]}, ${teamSets[4][0][1]}, ${teamSets[4][0][2]} & ${teamSets[4][0][3]} in set 4.<br><br>
    You should also know that you have four all male teams, in sets 1,2, 4 and 5. <br><br>
    `
      : numOfMen > 10
      ? `
    Please be aware that there are a few teams with three men, and all men. Perhaps rearrange names until you are happy.<br>
    `
      : "";
// here is the ugliest thing ever written
  results +=
    "<br><br><hr><h3>Code reviews</h3>| Week | Team 1 | Team 2 | Mentors |<br>| ---- | ---- | ------- | ------ |<br>";
  let teamCount = 0;
  for (let topic = 0; topic < topics.length - 1; topic++) {
    if (topics[topic] === "Teamwork" || topics[topic] === "Node") {
      results += `
            | ${topics[topic]} | ${teamSets[teamCount][0]} | ${
        teamSets[teamCount][1]
      } | ${
        topics[topic - 1] ? topics[topic - 1] : topics[topics.length - 1]
      } |<br>   
            |  | ${teamSets[teamCount][2]} | ${teamSets[teamCount][3]} | ${
        topics[topic]
      } |<br>
            `;
      teamCount++;
    } else {
      results += `
            | ${topics[topic]} | ${teamSets[teamCount][0]} | ${
        teamSets[teamCount][1]
      } | ${
        topics[topic - 1] ? topics[topic - 1] : topics[topics.length - 1]
      } |<br>   
            |  | ${teamSets[teamCount][2]} | ${teamSets[teamCount][3]} | ${
        topics[topic]
      }                                               |<br>
            | ${topics[topic + 1]}| ${teamSets[teamCount][0]} | ${
        teamSets[teamCount][2]
      }| ${
        topics[topic + 1]
      }                                             |<br>   
            | | ${teamSets[teamCount][1]} | ${teamSets[teamCount][3]}| ${
        topics[topic] ? topics[topic] : topics[topics.length - 1]
      }     |<br>`;
      topic++;
    }
    console.log(teamCount);
  }

  results += `<br>`;
  return results;
};

const printPairs = (pairs) => {
  let results = "<hr><h3>Workshop pairs</h3>";
  for (let week = 0; week < pairs.length; week++) {
    results += `Week ${week < readingWeek ? week + 1 : week + 2}: ${
      topics[week]
    }<br>`;
    for (let segment = 0; segment < segments.length; segment++) {
      results += `
                ${segments[segment]}<br>
                | Person 1 | Person 2 |<br>
                | -------- | -------- |<br>
            `;
      for (let pair = 0; pair < pairs[week][segment].length; pair++) {
        results += `| ${pairs[week][segment][pair][0]} | ${pairs[week][segment][pair][1]} |<br>`;
      }
      results += "<br>";
    }
    results += "<br>";
  }
  results += "<br><br>";
  return results;
};

const printAll = (cohort, teams, pairs, numOfMen) => {
  longestName = cohort.reduce((a, b) => (a.length > b.length ? a : b)).length;

  let results = "";
  results += printCohort(cohort);
  results += printTeams(teams, numOfMen);
  results += printPairs(pairs);
  return results;
};
