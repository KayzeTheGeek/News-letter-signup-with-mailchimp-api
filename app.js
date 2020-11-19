const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    var firstName = req.body.fName;
    var secondName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName,
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data);

    var options = {
        url: 'https://us7.api.mailchimp.com/3.0/lists/1e731b4db5',
        method: 'POST',
        headers: {
            "Authorization": "Kaytee dcd1d3b2fd507d5d915f8d592e6464d8-us7"
        },
        body: jsonData
    };

    request(options, function (error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
    })
});

app.post("/failure", function (req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server running on port 3000")
});

//API key
//dcd1d3b2fd507d5d915f8d592e6464d8-us7

//List Id
//1e731b4db5
