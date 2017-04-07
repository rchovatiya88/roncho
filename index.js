'use strict'; 
 var http = require ('http');

exports.handler = function (event,context) {
    var request  = event.request;
try {
if (request.type === "LaunchRequest") {
    var options = {};
    options.speechText = "Hi my name is millie i'm the family doggie, using alexa i can talk but in real life i cannot see, i can see but i can not talk, tell alexa who is here. ";
    options.repromptText = "For example, like say hi to ronak";
    options.endSession = false;  
    context.succeed(buildResponse(options));

} else if (request.type === "IntentRequest"){
    let options = {};
   
    if (request.intent.name === "HelloIntent"){
        
        let name = request.intent.slots.FirstName.value;
        // options.speechText = `woof <say-as interpret-as="spell-out">${name}</say-as> ${name}. `;
        options.speechText = "woof, Hi " +name+ " .";
        options.speechText += getWish();
        getQuote(function(quote,err){
            if(err) {
                context.fail(err);
            } else {
                options.speechText += quote;
                options.endSession = true;
                context.succeed(buildResponse(options));
            }
        });
        
    } else {
       throw "Unknown HelloIntent request";
    }
} else if (request.type === "SessionEndedRequest") {

} else {
    throw "Unknown intent type";
 } 
} catch(e) {
    context.fail("Exception: " +e);
    }
}

function getQuote (callback) {
    var url = "http://api.forismatic.com/api/1.0/json?method=getQuote&lang=en&format=json";
    var req = http.get(url,function(res){
        var body = "";

        res.on('data',function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            body = body.replace(/\\/g,'');
            var quote = JSON.parse(body);
            callback(quote.quoteText); // define what parameter you want from the api like quoteText  
        });
    }); 

    req.on('error', function(err){
        callback('', err);
    });
}

function getWish(){
    var myDate = new Date();
    var hours = myDate.getUTCHours() - 5;
    if (hours < 0) {
        hours = hours + 24;
    }

    if(hours < 12) {
        return "Woof Morning, Is it Time for Breakfast? As some human once said ";
    } else if (hours < 18) {
        return "Woof afternoon, Is it Time for Lunch? As some human once said ";
    } else {
        return "Woof evening, Is it Time for Dinner? As some human once said ";
    }
}

function buildResponse(options) {
    var response = {
        version: "1.0",
        response:{
            outputSpeech: {
                type: "SMML",
                ssml: "<speak>"+options.speechText+"</speak>"
            },
            shouldEndSession: options.endSession
        }
    };

    if(options.repromptText){
        response.response.reprompt = {
            outputSpeech: {
                type: "SSML",
                ssml: "<speak>"+options.speechText+"</speak>"  
            }
        };
    }
    return response;
}
