'use strict'; 

exports.handler = function (event,context) {
    var request  = event.request;

    /**
     * 3 types of requests
    i)   LaunchRequest       Ex: "Open greeter"
    ii)  IntentRequest       Ex: "Say hello to John" or "ask greeter to say hello to John"
    iii) SessionEndedRequest Ex: "exit" or error or timeout

     */

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
        options.speechText = "woof, Hi" +name+ " .";
        options.speechText += getWish();
        options.endSession = true;
        context.succeed(buildResponse(options));
    } else {
        context.fail("Unknown HelloIntent request")
    }
} else if (request.type === "SessionEndedRequest") {

} else {
    context.fail("Unknown LaunchRequest type");
    }
}

function getWish(){
    var myDate = new Date();
    var hours = myDate.getUTCHours() - 5;
    if (hours < 0) {
        hours = hours + 24;
    }

    if(hours < 12) {
        return "Woof Morning, Time for Breakfast?";
    } else if (hours < 18) {
        return "Woof afternoon, Time for Lunch?";
    } else {
        return "Woof evening, Time for Dinner?";
    }
}

function buildResponse(options) {
    var response = {
        version: "1.0",
        response:{
            outputSpeech: {
                type: "PlainText",
                text: options.speechText
            },
            shouldEndSession: options.endSession
        }
    };

    if(options.repromptText){
        response.response.reprompt = {
            outputSpeech: {
                type: "PlainText",
                text: options.repromptText
            }
        };
    }
    return respons;
}