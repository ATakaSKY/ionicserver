var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

var port = process.env.PORT || 3000;
var ip = process.env.IP || "127.0.0.1";

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/',function(req,res){
    console.log(req.body);

    if(req.body.result.action == 'checkVote'){

        var age = req.body.result.parameters.age;
        console.log(age);

        let response="";

        if(age.amount >= 18){
            response = "Yes";
        }else{
            response = "No";
        }

        res.json({
            "displayText":response,
            "speech":response
        })

    }else if(req.body.result.action == 'add'){

        let num1 = parseFloat(req.body.result.parameters.number1);
        let num2 = parseFloat(req.body.result.parameters.number2);

        let sum = num1+num2;

        let response = "The sum of "+ num1 + " and " + num2 + " is " + sum;

        res.json({
            "displayText":response,
            "speech":response
        })

    }else if(req.body.result.action == 'subtract'){

        let num1 = parseFloat(req.body.result.parameters.number1);
        let num2 = parseFloat(req.body.result.parameters.number2);

        let diff = num2-num1;

        let response = "The result is "+ diff;

        res.json({
            "displayText":response,
            "speech":response
        })

    }else if(req.body.result.action == 'multiply'){

        let num1 = parseFloat(req.body.result.parameters.number1);
        let num2 = parseFloat(req.body.result.parameters.number2);

        let multiply = num2*num1;

        let response = "The result is "+ multiply;
        console.log(response);
        res.json({
            "displayText":response,
            "speech":multiply
        })

    }
    else if(req.body.result.action == 'divide'){

        let num1 = parseFloat(req.body.result.parameters.number1);
        let num2 = parseFloat(req.body.result.parameters.number2);

        let divide = num2/num1;

        let response = "The result is "+ divide;

        res.json({
            "displayText":response,
            "speech":divide
        })

    }else if(req.body.result.action == 'weather'){

        let city = req.body.result.parameters.city;
        let url = "http://api.apixu.com/v1/current.json?key=005f8e7735d9485687091550172709&q=" + city;

        request(url, function(error,response,body){
            let temp = JSON.parse(body).current.temp_c;
            let responseText = "The weather in "+ city + " is " + temp + "degree centigrade";
            res.json({
                "displayText":responseText,
                "speech":responseText
            })
        })
    }
})

app.listen(port,ip);