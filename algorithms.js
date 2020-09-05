const calcPoss = (ms,nms) => {
  let mFac = 1, nmFac = 1;
  for (let i = 2; i <= ms; i++) {
        mFac = mFac * i;
  }
  for (let i = 2; i <= nms; i++) {
        nmFac = nmFac * i;
  }
  return Math.floor((mFac + nmFac) / 24);
}

const pairOptions = [
  [
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7],
    [8, 9],
    [10, 11],
    [12, 13],
    [14, 15],
  ],
  [
    [0, 2],
    [1, 3],
    [4, 6],
    [5, 7],
    [8, 10],
    [9, 11],
    [12, 14],
    [13, 15],
  ],
  [
    [0, 3],
    [2, 5],
    [4, 7],
    [6, 9],
    [8, 11],
    [10, 13],
    [12, 15],
    [14, 1],
  ],
  [
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
    [8, 12],
    [9, 13],
    [10, 14],
    [11, 15],
  ],
  [
    [0, 5],
    [2, 7],
    [4, 9],
    [6, 11],
    [8, 13],
    [10, 15],
    [12, 1],
    [14, 3],
  ],
  [
    [0, 6],
    [1, 7],
    [4, 10],
    [5, 11],
    [8, 14],
    [9, 15],
    [12, 2],
    [13, 3],
  ],
  [
    [0, 7],
    [2, 9],
    [4, 11],
    [6, 13],
    [8, 15],
    [10, 1],
    [12, 3],
    [14, 5],
  ],
  [
    [0, 8],
    [1, 9],
    [2, 10],
    [3, 11],
    [4, 12],
    [5, 13],
    [6, 14],
    [7, 15],
  ],
  [
    [0, 9],
    [1, 8],
    [2, 11],
    [3, 10],
    [4, 13],
    [5, 12],
    [6, 15],
    [7, 14],
  ],
  [
    [0, 10],
    [1, 11],
    [2, 8],
    [3, 9],
    [4, 14],
    [5, 15],
    [6, 12],
    [7, 13],
  ],
  [
    [0, 11],
    [2, 13],
    [4, 15],
    [6, 1],
    [8, 3],
    [10, 5],
    [12, 7],
    [14, 9],
  ],
  [
    [0, 12],
    [1, 13],
    [2, 14],
    [3, 15],
    [8, 4],
    [9, 5],
    [10, 6],
    [11, 7],
  ],
  [
    [0, 13],
    [2, 15],
    [4, 1],
    [6, 3],
    [8, 5],
    [10, 7],
    [12, 12],
    [14, 11],
  ],
  [
    [0, 14],
    [1, 15],
    [2, 4],
    [3, 5],
    [6, 8],
    [7, 9],
    [10, 12],
    [11, 13],
  ],
  [
    [0, 15],
    [2, 1],
    [4, 3],
    [6, 5],
    [8, 7],
    [10, 9],
    [12, 11],
    [14, 13],
  ],
];

const createCohort = (mNames, nmNames) => {
  const cohort = Array.from(nmNames);
  switch (mNames.length) {
    case 1:
      cohort.splice(0, 0, mNames[0]);
      break;
    case 2:
      cohort.splice(0, 0, mNames[0]);
      cohort.splice(5, 0, mNames[1]);
      break;
    case 3:
      cohort.splice(0, 0, mNames[0]);
      cohort.splice(5, 0, mNames[1]);
      cohort.splice(10, 0, mNames[2]);
      break;
    case 4:
      cohort.splice(0, 0, mNames[0]);
      cohort.splice(5, 0, mNames[1]);
      cohort.splice(10, 0, mNames[2]);
      cohort.splice(15, 0, mNames[3]);
      break;
    case 5:
      cohort.splice(0, 0, mNames[0]);
      cohort.splice(3, 0, mNames[4]);
      cohort.splice(5, 0, mNames[1]);
      cohort.splice(10, 0, mNames[2]);
      cohort.splice(15, 0, mNames[3]);
      break;
    case 6:
      cohort.splice(0, 0, mNames[0]);
      cohort.splice(3, 0, mNames[4]);
      cohort.splice(5, 0, mNames[1]);
      cohort.splice(10, 0, mNames[2]);
      cohort.splice(12, 0, mNames[5]);
      cohort.splice(15, 0, mNames[3]);
      break;
    case 7:
      cohort.splice(3, 0, mNames[0]);
      cohort.splice(7, 0, mNames[1]);
      cohort.splice(11, 0, mNames[2]);
      cohort.splice(12, 0, mNames[3]);
      cohort.splice(13, 0, mNames[4]);
      cohort.splice(14, 0, mNames[5]);
      cohort.splice(15, 0, mNames[6]);
      break;
    case 8:
      cohort.splice(0, 0, mNames[0]);
      cohort.splice(3, 0, mNames[4]);
      cohort.splice(5, 0, mNames[1]);
      cohort.splice(6, 0, mNames[6]);
      cohort.splice(9, 0, mNames[7]);
      cohort.splice(10, 0, mNames[2]);
      cohort.splice(12, 0, mNames[5]);
      cohort.splice(15, 0, mNames[3]);
      break;
    case 9:
      cohort.splice(3, 0, mNames[0]);
      cohort.splice(6, 0, mNames[7]);
      cohort.splice(7, 0, mNames[1]);
      cohort.splice(9, 0, mNames[8]);
      cohort.splice(11, 0, mNames[2]);
      cohort.splice(12, 0, mNames[3]);
      cohort.splice(13, 0, mNames[4]);
      cohort.splice(14, 0, mNames[5]);
      cohort.splice(15, 0, mNames[6]);
      break;
    case 10:
      cohort.splice(0, 0, mNames[9]);
      cohort.splice(3, 0, mNames[0]);
      cohort.splice(6, 0, mNames[7]);
      cohort.splice(7, 0, mNames[1]);
      cohort.splice(9, 0, mNames[8]);
      cohort.splice(11, 0, mNames[2]);
      cohort.splice(12, 0, mNames[3]);
      cohort.splice(13, 0, mNames[4]);
      cohort.splice(14, 0, mNames[5]);
      cohort.splice(15, 0, mNames[6]);
      break;
    default:
      cohort.push(...mNames);
  }
  return cohort;
};

const createTeams = (cohort) => {
  const newTeams = [
    [
      [cohort[0], cohort[4], cohort[8], cohort[12]],
      [cohort[1], cohort[5], cohort[9], cohort[13]],
      [cohort[2], cohort[6], cohort[10], cohort[14]],
      [cohort[3], cohort[7], cohort[11], cohort[15]],
    ],
    [
      [cohort[0], cohort[1], cohort[2], cohort[3]],
      [cohort[4], cohort[5], cohort[6], cohort[7]],
      [cohort[8], cohort[9], cohort[10], cohort[11]],
      [cohort[12], cohort[13], cohort[14], cohort[15]],
    ],
    [
      [cohort[0], cohort[5], cohort[14], cohort[11]],
      [cohort[4], cohort[9], cohort[2], cohort[15]],
      [cohort[8], cohort[13], cohort[6], cohort[3]],
      [cohort[12], cohort[1], cohort[10], cohort[7]],
    ],
    [
      [cohort[0], cohort[9], cohort[6], cohort[15]],
      [cohort[4], cohort[13], cohort[10], cohort[3]],
      [cohort[8], cohort[1], cohort[14], cohort[7]],
      [cohort[12], cohort[5], cohort[2], cohort[11]],
    ],
    [
      [cohort[0], cohort[13], cohort[10], cohort[7]],
      [cohort[4], cohort[1], cohort[14], cohort[11]],
      [cohort[8], cohort[5], cohort[2], cohort[15]],
      [cohort[12], cohort[9], cohort[6], cohort[3]],
    ],
  ];
  return newTeams;
};

const createPairs = (cohort) => {
  const workshopPairs = [];
  let pairRef = 6,
    week = -1,
    seg = 0;
  for (let workshop = 0; workshop < 45; workshop++) {
    if (workshop % 15 === 0) {
      pairRef = 0;
    }
    if (pairRef % 5 === 0) {
      week++;
      seg = 0;
      workshopPairs.push([]);
    }
    workshopPairs[week].push([]);
    for (let pairNo = 0; pairNo < 8; pairNo++) {
      workshopPairs[week][seg].push([
        cohort[pairOptions[pairRef][pairNo][0]],
        cohort[pairOptions[pairRef][pairNo][1]],
      ]);
    }
    pairRef++;
    seg++;
  }
  return workshopPairs;
};
