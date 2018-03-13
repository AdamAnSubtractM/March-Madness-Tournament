jQuery(document).ready(function($){
  console.log('ready');
  // Determines whether the content populates in staging only or not. True = only staging enviornment, false = PROD and Staging
  var stagingEnvOnly = false;
  // Determines whether the Sweet Sixteen has officially started.
  var sweetSixteen = false;
  // Determines whether the Elite Eight has officially started.
  var eliteEight = false;
  // Determines whether the FinalFour has oficially started.
  var finalFour = false;
  // Determines whether the Championship game has officially started.
  var championship = false;
  // Keeps track of the current data layer. That way we don't keeping invoking the same function call
  // by click a link multiple times in a row
  var eastCount = 1;
  var westCount = 0;
  var midwestCount = 0;
  var southCount = 0;
  // The round number data object. This determines which round gets the active state styling
  var y =
  {
    // Only one should be true at once! Once round one is over, switch it to false
    // and set round2 or the proceeding round to the current round to true.
    // If I had more time, I'd write logic to prevent them from ever being true at the same time.
    round1 : true,
    round2 : false,
    round3 : false,
    round4 : false
  };
  // The NCAA data object. The entire page is generated from these data objects. There is one for each division (e.g. east, west, midwest, south)
  var east = [
    {
      // This determines the direct location of the team on the bracket.
      // The seed number is placed in the lower left corner of each table.
      // Options: #1 - #16
      seedNumber : 1,
      // This is the name that will display in the table row.
      // It was decided on that the city/state would display instead of the
      // full team name.
      // Options: *** Will be determined day before launch ***
      // Example: Kentucky, Virginia, Virginia Tech, Villanova
      schoolName : "Villanova",
      // This determines the school's abbreviation. This is super important
      // as the name switch to the abbreviation on mobile.
      abbreviation : "VILL",
      // Click through link:
      ctaLink: "/c/villanova-wildcats-apparel-gear",
      // The rounds determine which column the team is populated in.
      // During the beginning rounds, every team will have first round set to 'true'
      // Only the teams that advance to the next round will get a 'true' on the
      // proceeding rounds.
      // Options: Boolean
      firstRound : true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      // This determines whether the team has been eliminated or not.
      // This is technically optional as not every team will be eliminated but
      // its definitely required for those that are eliminated.
      // Options: Boolean
      eliminated : false,
      // This determines whether the team has won their division or not
      // This is technically optional as not every team will win their divison but
      // its definitely required for those that do.
      // Options: Boolean
      divisionWinner : false,
      // This determines whether the team has won the entire NCAA tournament
      // Only required for the overall winner of the tournament
      // Options: Boolean
      tournamentWinner : false
    },
    {
      seedNumber : 2,
      schoolName : "Purdue",
      abbreviation: "PUR",
      ctaLink: "/c/purdue-boilermakers-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },{
      seedNumber : 3,
      schoolName : "Texas Tech",
      abbreviation: "TTU",
      ctaLink: "/c/texas-tech-red-raiders-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 4,
      schoolName : "Wichita State",
      abbreviation: "WICH",
      ctaLink: "/c/wichita-state-shockers-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 5,
      schoolName : "West Virginia",
      abbreviation: "WVU",
      ctaLink: "/c/west-virginia-mountaineers-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 6,
      schoolName : "Florida",
      abbreviation: "FLA",
      ctaLink: "/c/florida-gators-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 7,
      schoolName : "Arkansas",
      abbreviation: "ARK",
      ctaLink: "/c/arkansas-razorbacks-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 8,
      schoolName : "Virginia Tech",
      abbreviation: "VT",
      ctaLink: "/c/virginia-tech-hokies-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 9,
      schoolName : "Alabama",
      abbreviation: "ALA",
      ctaLink: "/c/alabama-crimson-tide-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 10,
      schoolName : "Butler",
      abbreviation: "BUT",
      ctaLink: "/c/butler-bulldogs-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 11,
      schoolName : "BON/LA",
      abbreviation: "TBD",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 12,
      schoolName : "Murray State",
      abbreviation: "MURR",
      ctaLink: "/c/murray-state-racers-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 13,
      schoolName : "Marshall",
      abbreviation: "MRSH",
      ctaLink: "/c/marshall-thundering-herd-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 14,
      schoolName : "SF Austin",
      abbreviation: "SFA",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 15,
      schoolName : "CSU Fullerton",
      abbreviation: "CSF",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 16,
      schoolName : "LIU/RAD",
      abbreviation: "TBD",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    }
  ];
  var west = [
    {
      seedNumber : 1,
      schoolName : "Xavier",
      abbreviation: "XAV",
      ctaLink: "/c/xavier-musketeers-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 2,
      schoolName : "UNC",
      abbreviation: "UNC",
      ctaLink: "/c/north-carolina-tar-heels-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },{
      seedNumber : 3,
      schoolName : "Michigan",
      abbreviation: "MICH",
      ctaLink: "/c/michigan-wolverines-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 4,
      schoolName : "Gonzaga",
      abbreviation: "GONZ",
      ctaLink: "/c/gonzaga-bulldogs-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 5,
      schoolName : "OSU",
      abbreviation: "OSU",
      ctaLink: "/c/ohio-state-buckeyes-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 6,
      schoolName : "Houston",
      abbreviation: "HOU",
      ctaLink: "/c/houston-cougars-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 7,
      schoolName : "Texas A&M",
      abbreviation: "TA&M",
      ctaLink: "/c/texas-am-aggies-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 8,
      schoolName : "Missouri",
      abbreviation: "MIZZ",
      ctaLink: "/c/missouri-tigers-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 9,
      schoolName : "Florida State",
      abbreviation: "FSU",
      ctaLink: "/c/florida-state-seminoles-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 10,
      schoolName : "Providence",
      abbreviation: "PROV",
      ctaLink: "/c/providence-friars-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 11,
      schoolName : "San Diego State",
      abbreviation: "SDSU",
      ctaLink: "/c/san-diego-state-aztecs-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 12,
      schoolName : "South Dakota State",
      abbreviation: "SDSU",
      ctaLink: "/c/south-dakota-state-jackrabbits-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 13,
      schoolName : "UNCG",
      abbreviation: "UNCG",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 14,
      schoolName : "Montana",
      abbreviation: "MONT",
      ctaLink: "/c/montana-grizzlies-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 15,
      schoolName : "Lipscomb",
      abbreviation: "LIP",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 16,
      schoolName : "NCC/TS",
      abbreviation: "TBD",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    }
  ];
  var midwest = [
    {
      seedNumber : 1,
      schoolName : "Kansas",
      abbreviation: "KU",
      ctaLink: "/c/kansas-jayhawks-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 2,
      schoolName : "Duke",
      abbreviation: "DUKE",
      ctaLink: "/c/duke-blue-devils-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },{
      seedNumber : 3,
      schoolName : "Michigan State",
      abbreviation: "MSU",
      ctaLink: "/c/michigan-state-spartans-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 4,
      schoolName : "Auburn",
      abbreviation: "AUB",
      ctaLink: "/c/auburn-tigers-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 5,
      schoolName : "Clemson",
      abbreviation: "CLEM",
      ctaLink: "/c/clemson-tigers-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 6,
      schoolName : "TCU",
      abbreviation: "TCU",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 7,
      schoolName : "URI",
      abbreviation: "URI",
      ctaLink: "/c/rhode-island-rams-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 8,
      schoolName : "Seton Hall",
      abbreviation: "HALL",
      ctaLink: "/c/seton-hall-pirates-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 9,
      schoolName : "NC State",
      abbreviation: "NCST",
      ctaLink: "/c/nc-state-wolfpack-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 10,
      schoolName : "Oklahoma",
      abbreviation: "OKLA",
      ctaLink: "/c/oklahoma-sooners-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 11,
      schoolName : "ASU/SY",
      abbreviation: "TBD",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 12,
      schoolName : "New Mexico State",
      abbreviation: "NMSU",
      ctaLink: "/c/new-mexico-state-aggies-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 13,
      schoolName : "Charleston",
      abbreviation: "COFC",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 14,
      schoolName : "Bucknell",
      abbreviation: "BUCK",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 15,
      schoolName : "Iona",
      abbreviation: "IONA",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 16,
      schoolName : "Penn",
      abbreviation: "PENN",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    }
  ];
  var south = [
    {
      seedNumber : 1,
      schoolName : "UVA",
      abbreviation: "UVA",
      ctaLink: "/c/virginia-cavaliers-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 2,
      schoolName : "Cincinnati",
      abbreviation: "CIN",
      ctaLink: "/c/cincinnati-bearcats-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },{
      seedNumber : 3,
      schoolName : "Tennessee",
      abbreviation: "TENN",
      ctaLink: "/c/tennessee-volunteers-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 4,
      schoolName : "Arizona",
      abbreviation: "ARIZ",
      ctaLink: "/c/arizona-wildcats-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 5,
      schoolName : "Kentucky",
      abbreviation: "UK",
      ctaLink: "/c/kentucky-wildcats-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 6,
      schoolName : "Miami",
      abbreviation: "MIA",
      ctaLink: "/c/miami-hurricanes-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 7,
      schoolName : "Nevada",
      abbreviation: "NEV",
      ctaLink: "/c/nevada-wolf-pack-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 8,
      schoolName : "Creighton",
      abbreviation: "CREI",
      ctaLink: "/c/creighton-bluejays-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 9,
      schoolName : "Kansas State",
      abbreviation: "KSU",
      ctaLink: "/c/kansas-state-wildcats-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 10,
      schoolName : "Texas",
      abbreviation: "TEX",
      ctaLink: "/c/texas-longhorns-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 11,
      schoolName : "Loyola-Chicago",
      abbreviation: "L-IL",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 12,
      schoolName : "Davidson",
      abbreviation: "DAV",
      ctaLink: "/c/davidson-wildcats-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 13,
      schoolName : "Buffalo",
      abbreviation: "BUFF",
      ctaLink: "c/buffalo-bulls-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 14,
      schoolName : "Wright State",
      abbreviation: "WRST",
      ctaLink: "/c/wright-state-raiders-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 15,
      schoolName : "Georgia State",
      abbreviation: "GSU",
      ctaLink: "/c/georgia-state-panthers-apparel-gear",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    },
    {
      seedNumber : 16,
      schoolName : "UMBC",
      abbreviation: "UMBC",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    }
  ];

  // ==================================
  // Page functions start to fire here
  // Check if the stagingEnvOnly var is set to true. If so only display the content in the staging enviornments. Post launch, this should be set to false.
  // ==================================
  // Set main hero content CTA:
  $('.ncaa-bracket .landing-hero-content a').attr("href", "/f/college-bball-2018");
  // $('.ncaa-bracket .landing-hero-content p').html('Click on your team to shop the latest apparel &amp; gear');
  if (stagingEnvOnly == true) {
    if ( (window.location.href.indexOf("auth1") > -1 || window.location.href.indexOf("rdc") > -1 || window.location.href.indexOf("ssc") > -1 || window.location.href.indexOf("auth2") > -1) ) {
      // Populate the bracket at the start with the East content
      populateEast();
      checkRound();
      activateNav();
    }
  } else {
    // Populate the bracket at the start with the East content
    populateEast();
    checkRound();
    activateNav();
  }
  // ==================================
  // Page functions firing ends here
  // ==================================

  // Adds the 'content-loaded' class to the loading animation which makes it go away after the content
  // has loaded.
  function contentLoaded() {
    $('.finder-preloader-mask, .finder-loading-animation-container').addClass('content-loaded');
  }
  function checkRound() {
    if (y.round1 == true) {
      $('.ncaa-bracket .round-one .round-number').addClass('active');
      console.log('Round 1 active.');
    }
    if (y.round2 == true) {
      $('.ncaa-bracket .round-two .round-number').addClass('active');
      console.log('Round 2 active.');
    }
    if (y.round3 == true) {
      $('.ncaa-bracket .round-three .round-number').addClass('active');
      console.log('Round 3 active.');
    }
    if (y.round4 == true) {
      $('.ncaa-bracket .round-four .round-number').addClass('active');
      console.log('Round 4 active.');
    }
    if (y.round1 == false && y.round2 == false && y.round3 == false && y.round4 == false) {
      console.log('All rounds are set to false. There should be atleast one round set to true.');
    }
  }
  function activateNav() {
    $('.ncaa-bracket .main-navigation .east').click(function(){
      if (eastCount <= 0) {
        var _$t = $(this);
        _$t.addClass('active');
        _$t.parents('li').siblings().children('a').removeClass('active');
        populateEast();
        eastCount++;
        westCount = 0;
        midwestCount = 0;
        southCount = 0;
      } else {
        console.log('Currently viewing East Bracket.');
      }
    });
    $('.ncaa-bracket .main-navigation .west').click(function(){
      if (westCount <= 0){
        var _$t = $(this);
        _$t.addClass('active');
        _$t.parents('li').siblings().children('a').removeClass('active');
        populateWest();
        westCount++;
        eastCount = 0;
        midwestCount = 0;
        southCount = 0;
      } else {
        console.log('Currently viewing West Bracket.');
      }
    });
    $('.ncaa-bracket .main-navigation .midwest').click(function(){
      if (midwestCount <= 0) {
        var _$t = $(this);
        _$t.addClass('active');
        _$t.parents('li').siblings().children('a').removeClass('active');
        populateMidwest();
        midwestCount++;
        westCount = 0;
        eastCount = 0;
        southCount = 0;
      } else {
        console.log('Currently viewing Midwest Bracket.');
      }
    });
    $('.ncaa-bracket .main-navigation .south').click(function(){
      if (southCount <= 0) {
        var _$t = $(this);
        _$t.addClass('active');
        _$t.parents('li').siblings().children('a').removeClass('active');
        populateSouth();
        southCount++;
        westCount = 0;
        midwestCount = 0;
        eastCount = 0;
      } else {
        console.log('Currently viewing South Bracket.');
      }
    });
  }
  function populateEast() {
    console.log('Populating East content.');
    $('.cell').removeClass('eliminated');
    $('.cell p.team a, .cell p.abreviation a').html('?').attr({'data-em':'','title':'','href':'javascript:void(0);'});
    $('.region-champ-section .region-champ-cell .region').html('East');
    $('.region-champ-cell .team').removeClass('west midwest south').addClass('east');
    $('.team.east').show();
    $('.team.midwest a, .team.west a, .team.south a').hide();
    for (i = 0; i < east.length; i++) {
      var x = east[i];
      if (x.seedNumber == '' || x.seedNumber < 1 || x.seedNumber > 16) {
        console.log('East:' + x.schoolName +'\'s seed number must be #1-16!');
      }
      if (x.ctaLink == '') {
        x.ctaLink = 'javascript:void(0);';
      }
      if (x.schoolName == '') {
        x.schoolName = "?";
      }
      if (x.abbreviation == '') {
        x.abbreviation = "XX";
      }
      if (x.secondRound == true) {
        $('.round-two [class*="-'+ x.seedNumber +'-"] .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.abbreviation).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round2', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        $('.round-two [class*="-'+ x.seedNumber +'-"] .team a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.schoolName).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round2', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        if (x.eliminated == true) {
          $('.round-two [class*="-'+  x.seedNumber + '-"]').addClass('eliminated');
        }
      }
      if (x.thirdRound == true) {
        $('.round-three [class*="-'+ x.seedNumber +'-"] .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.abbreviation).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round3', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        $('.round-three [class*="-'+ x.seedNumber +'-"] .team a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.schoolName).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round3', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        if (x.eliminated == true) {
          $('.round-three [class*="-'+  x.seedNumber + '-"]').addClass('eliminated');
        }
      }
      if (x.fourthRound == true) {
        $('.round-four [class*="-'+ x.seedNumber +'-"] .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.abbreviation).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round4', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        $('.round-four [class*="-'+ x.seedNumber +'-"] .team a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.schoolName).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round4', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        if (x.eliminated == true) {
          $('.round-four [class*="-'+  x.seedNumber + '-"]').addClass('eliminated');
        }
      }
      if (x.eliminated == true) {
        $('.round-one .cell.seed-' + x.seedNumber + '').addClass('eliminated');

      }
      if (x.divisionWinner == true) {
        $('.region-champ-cell .cell .team a').html('<span class="seed-number">' + x.seedNumber + '</span> &nbsp;' + x.schoolName + '&nbsp;').attr({'data-em' : 'ncaa_bt_' + x.schoolName, 'title' : 'Shop ' + x.schoolName + ' Gear', 'href' : x.ctaLink});
      }
      $('.cell.seed-' + x.seedNumber + ' .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> &nbsp;' + x.abbreviation + '&nbsp;').attr({'data-em' : 'ncaa_bt_' + x.schoolName, 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
      $('.cell.seed-' + x.seedNumber + ' .team a').html('<span class="seed-number">' + x.seedNumber + '</span> &nbsp;' + x.schoolName + '&nbsp;').attr({'data-em' : 'ncaa_bt_' + x.schoolName, 'title' : 'Shop ' + x.schoolName + ' Gear', 'href' : x.ctaLink});
    }
    contentLoaded();
  }
  function populateWest() {
    console.log('Populating West content.');
    $('.cell').removeClass('eliminated');
    $('.cell p.team a, .cell p.abreviation a').html('?').attr({'data-em':'','title':'','href':'javascript:void(0);'});
    $('.region-champ-section .region-champ-cell .region').html('West');
    $('.region-champ-cell .team').removeClass('midwest east south').addClass('west');
    $('.team.west').show();
    $('.team.midwest a, .team.east a, .team.south a').hide();
    for (i = 0; i < west.length; i++) {
      var x = west[i];
      if (x.seedNumber == '' || x.seedNumber < 1 || x.seedNumber > 16) {
        console.log('West:' + x.schoolName +'\'s seed number must be #1-16!');
      }
      if (x.ctaLink == '') {
        x.ctaLink = 'javascript:void(0);';
      }
      if (x.schoolName == '') {
        x.schoolName = "?";
      }
      if (x.abbreviation == '') {
        x.abbreviation = "XX";
      }
      if (x.secondRound == true) {
        $('.round-two [class*="-'+ x.seedNumber +'-"] .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.abbreviation).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round2', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        $('.round-two [class*="-'+ x.seedNumber +'-"] .team a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.schoolName).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round2', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        if (x.eliminated == true) {
          $('.round-two [class*="-'+  x.seedNumber + '-"]').addClass('eliminated');
        }
      }
      if (x.thirdRound == true) {
        $('.round-three [class*="-'+ x.seedNumber +'-"] .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.abbreviation).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round3', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        $('.round-three [class*="-'+ x.seedNumber +'-"] .team a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.schoolName).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round3', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        if (x.eliminated == true) {
          $('.round-three [class*="-'+  x.seedNumber + '-"]').addClass('eliminated');
        }
      }
      if (x.fourthRound == true) {
        $('.round-four [class*="-'+ x.seedNumber +'-"] .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.abbreviation).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round4', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        $('.round-four [class*="-'+ x.seedNumber +'-"] .team a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.schoolName).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round4', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        if (x.eliminated == true) {
          $('.round-four [class*="-'+  x.seedNumber + '-"]').addClass('eliminated');
        }
      }
      if (x.eliminated == true) {
        $('.round-one .cell.seed-' + x.seedNumber + '').addClass('eliminated');

      }
      if (x.divisionWinner !== true) {
        $('.region-champ-cell .team.west a').html('?');
      }
      if (x.divisionWinner == true) {
        $('.region-champ-cell .cell .team a').html('<span class="seed-number">' + x.seedNumber + '</span> &nbsp;' + x.schoolName + '&nbsp;').attr({'data-em' : 'ncaa_bt_' + x.schoolName, 'title' : 'Shop ' + x.schoolName + ' Gear', 'href' : x.ctaLink});
      }
      $('.cell.seed-' + x.seedNumber + ' .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> &nbsp;' + x.abbreviation + '&nbsp;').attr({'data-em' : 'ncaa_bt_' + x.schoolName, 'title' : 'Shop ' + x.schoolName + '\'s Gear'});
      $('.cell.seed-' + x.seedNumber + ' .team a').html('<span class="seed-number">' + x.seedNumber + '</span> &nbsp;' + x.schoolName + '&nbsp;').attr({'data-em' : 'ncaa_bt_' + x.schoolName, 'title' : 'Shop ' + x.schoolName + ' Gear', 'href' : x.ctaLink});
    }
    contentLoaded();
  }
  function populateMidwest() {
    console.log('Populating Midwest content.');
    $('.cell').removeClass('eliminated');
    $('.cell p.team a, .cell p.abreviation a').html('?').attr({'data-em':'','title':'','href':'javascript:void(0);'});
    $('.region-champ-section .region-champ-cell .region').html('Midwest');
    $('.region-champ-cell .team').removeClass('east west south').addClass('midwest');
    $('.team.midwest').show();
    $('.team.east a, .team.west a, .team.south a').hide();
    for (i = 0; i < midwest.length; i++) {
      var x = midwest[i];
      if (x.seedNumber == '' || x.seedNumber < 1 || x.seedNumber > 16) {
        console.log('West:' + x.schoolName +'\'s seed number must be #1-16!');
      }
      if (x.ctaLink == '') {
        x.ctaLink = 'javascript:void(0);';
      }
      if (x.schoolName == '') {
        x.schoolName = "?";
      }
      if (x.abbreviation == '') {
        x.abbreviation = "XX";
      }
      if (x.secondRound == true) {
        $('.round-two [class*="-'+ x.seedNumber +'-"] .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.abbreviation).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round2', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        $('.round-two [class*="-'+ x.seedNumber +'-"] .team a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.schoolName).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round2', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        if (x.eliminated == true) {
          $('.round-two [class*="-'+  x.seedNumber + '-"]').addClass('eliminated');
        }
      }
      if (x.thirdRound == true) {
        $('.round-three [class*="-'+ x.seedNumber +'-"] .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.abbreviation).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round3', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        $('.round-three [class*="-'+ x.seedNumber +'-"] .team a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.schoolName).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round3', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        if (x.eliminated == true) {
          $('.round-three [class*="-'+  x.seedNumber + '-"]').addClass('eliminated');
        }
      }
      if (x.fourthRound == true) {
        $('.round-four [class*="-'+ x.seedNumber +'-"] .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.abbreviation).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round4', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        $('.round-four [class*="-'+ x.seedNumber +'-"] .team a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.schoolName).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round4', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        if (x.eliminated == true) {
          $('.round-four [class*="-'+  x.seedNumber + '-"]').addClass('eliminated');
        }
      }
      if (x.eliminated == true) {
        $('.round-one .cell.seed-' + x.seedNumber + '').addClass('eliminated');
      }
      if (x.divisionWinner !== true) {
        $('.region-champ-cell .team.midwest a').html('?');
      }
      if (x.divisionWinner == true) {
        $('.region-champ-cell .cell .team a').html('<span class="seed-number">' + x.seedNumber + '</span> &nbsp;' + x.schoolName + '&nbsp;').attr({'data-em' : 'ncaa_bt_' + x.schoolName, 'title' : 'Shop ' + x.schoolName + ' Gear', 'href' : x.ctaLink});
      }
      $('.cell.seed-' + x.seedNumber + ' .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> &nbsp;' + x.abbreviation + '&nbsp;').attr({'data-em' : 'ncaa_bt_' + x.schoolName, 'title' : 'Shop ' + x.schoolName + '\'s Gear'});
      $('.cell.seed-' + x.seedNumber + ' .team a').html('<span class="seed-number">' + x.seedNumber + '</span> &nbsp;' + x.schoolName + '&nbsp;').attr({'data-em' : 'ncaa_bt_' + x.schoolName, 'title' : 'Shop ' + x.schoolName + ' Gear', 'href' : x.ctaLink});
    }
    contentLoaded();
  }
  function populateSouth() {
    console.log('Populating South content.');
    $('.cell').removeClass('eliminated');
    $('.cell p.team a, .cell p.abreviation a').html('?').attr({'data-em':'','title':'','href':'javascript:void(0);'});
    $('.region-champ-section .region-champ-cell .region').html('South');
    $('.region-champ-cell .team').removeClass('midwest west east').addClass('south');
    $('.team.south').show();
    $('.team.midwest a, .team.east a, .team.west a').hide();
    for (i = 0; i < south.length; i++) {
      var x = south[i];
      if (x.seedNumber == '' || x.seedNumber < 1 || x.seedNumber > 16) {
        console.log('South:' + x.schoolName +'\'s seed number must be #1-16!');
      }
      if (x.ctaLink == '') {
        x.ctaLink = 'javascript:void(0);';
      }
      if (x.schoolName == '') {
        x.schoolName = "?";
      }
      if (x.abbreviation == '') {
        x.abbreviation = "XX";
      }
      if (x.secondRound == true) {
        $('.round-two [class*="-'+ x.seedNumber +'-"] .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.abbreviation).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round2', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        $('.round-two [class*="-'+ x.seedNumber +'-"] .team a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.schoolName).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round2', 'title' : 'Shop ' + x.schoolName + '\'s Gear'});
        if (x.eliminated == true) {
          $('.round-two [class*="-'+  x.seedNumber + '-"]').addClass('eliminated');
        }
      }
      if (x.thirdRound == true) {
        $('.round-three [class*="-'+ x.seedNumber +'-"] .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.abbreviation).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round3', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        $('.round-three [class*="-'+ x.seedNumber +'-"] .team a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.schoolName).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round3', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        if (x.eliminated == true) {
          $('.round-three [class*="-'+  x.seedNumber + '-"]').addClass('eliminated');
        }
      }
      if (x.fourthRound == true) {
        $('.round-four [class*="-'+ x.seedNumber +'-"] .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.abbreviation).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round4', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        $('.round-four [class*="-'+ x.seedNumber +'-"] .team a').html('<span class="seed-number">' + x.seedNumber + '</span> ' + x.schoolName).attr({'data-em' : 'ncaa_bt_' + x.schoolName + '_round4', 'title' : 'Shop ' + x.schoolName + '\'s Gear', 'href' : x.ctaLink});
        if (x.eliminated == true) {
          $('.round-four [class*="-'+  x.seedNumber + '-"]').addClass('eliminated');
        }
      }
      if (x.eliminated == true) {
        $('.round-one .cell.seed-' + x.seedNumber + '').addClass('eliminated');

      }
      if (x.divisionWinner !== true) {
        $('.region-champ-cell .team.south a').html('?');
      }
      if (x.divisionWinner == true) {
        $('.region-champ-cell .cell .team a').html('<span class="seed-number">' + x.seedNumber + '</span> &nbsp;' + x.schoolName + '&nbsp;').attr({'data-em' : 'ncaa_bt_' + x.schoolName, 'title' : 'Shop ' + x.schoolName + ' Gear', 'href' : x.ctaLink});
      }
      $('.cell.seed-' + x.seedNumber + ' .team-abreviation a').html('<span class="seed-number">' + x.seedNumber + '</span> &nbsp;' + x.abbreviation + '&nbsp;').attr({'data-em' : 'ncaa_bt_' + x.schoolName, 'title' : 'Shop ' + x.schoolName + '\'s Gear'});
      $('.cell.seed-' + x.seedNumber + ' .team a').html('<span class="seed-number">' + x.seedNumber + '</span> &nbsp;' + x.schoolName + '&nbsp;').attr({'data-em' : 'ncaa_bt_' + x.schoolName, 'title' : 'Shop ' + x.schoolName + ' Gear', 'href' : x.ctaLink});
    }
    contentLoaded();
  }
});




