March Madness Tournament 2018
=========
## Getting Started
```sh
1. $ git clone https://bitbucket.org/dsgfed/march-madness-bracket-2018
2. $ npm i
3. $ gulp launch
```
## Updating the data file as the tournament goes on. See the example and documentation below:
* Questions?: See [Adam Knee](https://bitbucket.org/adam-knee/)
```
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
  
/ The NCAA data object. The entire page is generated from these data objects. There is one for each division (e.g. east, west, midwest, south)
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
      schoolName : "Kentucky",
      // This determines the school's abbreviation. This is super important
      // as the name switch to the abbreviation on mobile.
      abbreviation : "KY",
      // Click through link:
      ctaLink: "/s/fan-shop",
      // The rounds determine which column the team is populated in.
      // During the beginning rounds, every team will have first round set to 'true'
      // Only the teams that advance to the next round will get a 'true' on the
      // proceeding rounds.
      // Options: Boolean
      firstRound : true,
      secondRound : true,
      thirdRound : true,
      fourthRound : true,
      // This determines whether the team has been eliminated or not.
      // This is technically optional as not every team will be eliminated but
      // its definitely required for those that are eliminated.
      // Options: Boolean
      eliminated : false,
      // This determines whether the team has won their division or not
      // This is technically optional as not every team will win their divison but
      // its definitely required for those that do.
      // Options: Boolean
      divisionWinner : true,
      // This determines whether the team has won the entire NCAA tournament
      // Only required for the overall winner of the tournament
      // Options: Boolean
      tournamentWinner : false
    }];
    var west = [
    {
      seedNumber : 1,
      schoolName : "",
      abbreviation: "",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    }];
    var midwest = [
    {
      seedNumber : 1,
      schoolName : "",
      abbreviation: "",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    }];
    var south = [
    {
      seedNumber : 1,
      schoolName : "",
      abbreviation: "",
      ctaLink: "",
      firstRound: true,
      secondRound : false,
      thirdRound : false,
      fourthRound : false,
      eliminated : false,
      divisionWinner : false,
      tournamentWinner : false
    }];
```

Your editor can be setup with EditorConfig so that code style standards are enforced automatically. See http://editorconfig.org/#download and install the plugin for your editor of choice.

## The folder structure:

Read the [CSS Architecture Overview](src/scss/README.md) for documentation of the SCSS files.

```
Build in the src directory. 

src/
  assets/
    fonts/
    images/
    media/
scss/
  bootstrap3/
    bootstrap/
    _bootstrap3.scss
  _manifest.scss
  _vars.scss
  app.scss
css/
  app.css
js/
  bootstrap.js
  scripts.js
```

## Credits

* [Adam Knee](http://adamknee.net/)
* [Sass MQ](https://github.com/sass-mq/sass-mq)
* [Bootstrap](http://getbootstrap.com)

## License

spaceBoots3 is free to use under the [MIT License](LICENSE.md).

Copyright 2018 [Adam Knee](http://www.adamknee.net)
