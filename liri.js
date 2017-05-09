// Node Software ---- By Ravinder Soni
// Defining the global variables
// API Calls to spotify, omdb and twitter

var fs = require("fs");
var ky = require("./keys.js");
var inquirer = require("inquirer");
//var action = process.argv;     //Not Used  in this version kept it there for further ref.
var newSearch = "";
var request = require("request");
var myChoices;


myLoop(); // Calling Menu Option
//  *********************** Calling Request

function myLoop() { //It is continues call for the menu till user selects exit
process.stdout.write('\033c');
    inquirer.prompt([{
        type: "list",
        name: "myChoices",
        message: "------(MENU)------",
        choices: ["Movies", "Spotify", "Tweets", "Exit"] // Menu to Choose Options

    }, ]).then(function(user) {
        console.log(user.myChoices);
        if (user.myChoices == "Movies") {

        //    action[2] = "movies-this";

            checkarg("1"); // formatting the command line search 


        } else
        if (user.myChoices == "Spotify") {

      //      action[2] = "spotify-this-song";

            checkarg("2"); // formatting the command line search 

        } else
        if (user.myChoices == "Tweets") {

      //      action[2] = "my-tweets";
            chktwitter();
        } else
        if (user.myChoices == "Exit") {

            process.exit();
        }

    });



}

//**************************************** Twitter Search Function
function chktwitter() {
    var Twitter = require('twitter');
    var client = new Twitter({

        consumer_key: ky.consumer_key,
        consumer_secret: ky.consumer_secret,
        access_token_key: ky.access_token_key,
        access_token_secret: ky.access_token_secret,
    });

    var params = {
        'screen_name': 'ravithecoder'

    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            var cnt = tweets[0].user.statuses_count;

            console.log("***************MY TWITTER***************");
            console.log("Name : " + tweets[0].user.name);
            console.log("Screen Name :@" + tweets[0].user.screen_name);
            console.log("Account Created On :" + tweets[0].user.created_at);
            console.log("Following :" + tweets[0].user.friends_count + " friends.");

            for (var i = 0; i < cnt; i++) {
                var tcount = i + 1;
                console.log("---------------My Tweet (" + tcount + ")--------------");
                console.log(tweets[i].text);
                console.log("........................................");
                console.log(tweets[i].created_at);
                console.log("----------------------------------------");
            }

        } else {
            console.log(error);
        }
        askQuestion();
    });

}



//********************************* Movie Search Function
function chkmovie(newSearch, request) {
    process.stdout.write('\033c');
    if (newSearch == "") {
        newSearch = "Mr.Nobody";

    }
    var queryUrl = "http://www.omdbapi.com/?t=" + newSearch + "&y=&plot=short&r=json";
    //	console.log(queryUrl);
    var data = request(queryUrl, function(error, response, body) {


        // If the request is successful
        var jdata = JSON.parse(body);
        //  console.log(response);
        //	console.log(jdata);
        if (!error && response.statusCode == 200) {

            var mTitle = jdata.Title;
            var mReleased = jdata.Released;
            var mImdb = jdata.imdbRating;
            var mCountry = jdata.Country;
            var mLanguage = jdata.Language;
            var mPlot = jdata.Plot;
            var mActor = jdata.Actors;
            
            var mRottonTomatos = JSON.stringify(jdata.Ratings[0]);
            console.log("\n************************************************");
            console.log("Title: " + mTitle, "\nReleased: " + mReleased, "\nIMDB Ratings: " + mImdb, "\nCountry: " + mCountry, "\nLanguage: " + mLanguage, "\nPlot: " + mPlot, "\nActors: " + mActor, "\nRotton Tomatoes: " + mRottonTomatos);
            console.log("************************************************");
			askQuestion(); // asking question to continue and clearing screen for the menu
        }
    });
    // ...

}



// ************************************ Spotify Function
function chkspotify(newSearch) {
    //   process.stdout.write('\033c');

    var spotify = require('spotify');
    if (newSearch == "") {
        newSearch = 'dancing in the moonlight';

    }


    spotify.search({
        type: 'track',
        query: newSearch,
        limit: 10,
        offset: 20
    }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
         //   console.log(JSON.stringify(data.tracks, null, 4)); 
            console.log("\n**********************************************************")
            console.log("Track :" + JSON.stringify(data.tracks.items[0].name, null, 2));
            console.log("Popularity:" + JSON.stringify(data.tracks.items[0].popularity, null, 2));
            console.log("Track #:" + JSON.stringify(data.tracks.items[0].track_number, null, 2));
            console.log("Song Url:" + JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2));
            console.log('Artist:' + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
            console.log("**********************************************************")
			askQuestion(); // asking question to continue and clearing screen for the menu
        }


      
    });
    
}


// ******************************** Function to replace '+' sign in place of spaces

function checkarg(xnum) {


    if (xnum == "1") {
        inquirer.prompt([{
            type: "input",
            name: "newSearch1",
            message: "Enter name of Movie to search?"


        }, ]).then(function(user) {

            newSearch = user.newSearch1.split(' ').join('+');
            chkmovie(newSearch, request);

        })
    }
    if (xnum == "2") {

        inquirer.prompt([{
            type: "input",
            name: "newSearch1",
            message: "Enter name of Song to search?"


        }, ]).then(function(user) {
            newSearch = user.newSearch1.split(' ').join('+');
            chkspotify(newSearch);
        })
    }

}

function askQuestion() {

    inquirer.prompt([{
        type: "input",
        name: "newConf",
        message: "\nPress <Enter> to Continue?"


    }, ]).then(function(user) {
        if (true) {

            myLoop();

        }

    })

}

//------------------ End of Code