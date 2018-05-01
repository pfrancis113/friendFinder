var friends = require("../data/friends.js");

module.exports = function(app) {

   app.get("/api/friends", function (req,res){
       res.json(friends);
   });
   
   app.post("/api/friends", function (req,res){
       var bestMatch = {
           name: "",
           photo: "",
           friendDifference: 1000
       };

       console.log(req.body);

    //    Here we take the result of the user's survery, POST, and parse it.
    var userData  = req.body;
    var userScores = userData.scores;

    console.log(userScores);

    // this variable will calculate the differences between the user and each of those in the DB.
    var totalDifference = 0;

    // Here we loop through all the friend possibilities in the database.
    for (var i = 0; i < friends.length; i++){
        console.log(friends[i]);
        totalDifference = 0;
        // we then loop through all the scores of each friend
        for (var j = 0; j < friends[i].scores[j]; j++) {
            // we calculate the difference between the scores and sum them into the totalDifference.
            totalDifference += math.abs(parseInt(userScores[j])-parseInt(friends[i].scores[j]));
            // if the sum of differences is less then the differences of the current "best match"
            if (totalDifference <= bestMatch.friendDifference) {
                // Reset the bestMatch to be the new friend.
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
            }
        }
    }

    // Finally save the user's data to the database (this has to happen AFTER the check,
    // otherwise, the DB will always return that the user is the user's best friend).
    friends.push(userData);

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page.
    res.json(bestMatch);
   });

};