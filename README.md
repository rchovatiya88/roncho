# Roncho Alexa Skill
## STATUS - BLOCKED 

#Build Alexa Skill
    
## Skill using Lamda as an endpoint

- Skill goal and setup
- Request generation
- AWS Lambda function setup
- Node.js quick tutorial
- Coding, deploying and testing
- Local environment, AWS CLI setup and automation
- Adding more functionality
    - APIs
    - SSML
    - Sessions and built-in intents
    - Including Card
- Debugging
- Testing using Mocha Framework 

## Skill using Webserice as an endpoint
    
- Introduction
- Coding (Python and Flask web framework)
- Deploying from Local Web Server
- Hosting the skill on Heroku
- Testing using python unittest
- Requirements of Web service and FLASK-ASK
- Greetings skill using FLASK-ASL and deploying to Heroku

## Look up Skill
- Setup
- Coding, testing and deploying 
- Publishing process
- Certification requirements and fixes
- Improvements

## Email Skill
- Account linking introduction
- Gmail APIs and Google API console setup
- Skill setup
- Coding, testing and deploying
- Voice password introduction and AWS DynamoDB setup
- Adding voice password functionality and testing
- Adding Forgot pin functionality
- Conclusion

## Some of the Features
- How is the weather
- Set my alarm for 1 hour
- Whats in the news
- IFTTT (Find my phone)
- Find nearby restaurant
- Tell me about the movie
- Smart Home
- Alexa User Guide

 ## AWS Lambda 

 - AWS Lambda is a serverless service that runs your code in reponse to events and automatically manage the underlying compute resource for you 
 - AWS Free tier
 	- 1,000,000 free requests per month 
 	- Up to 3.2 million seconds of compute time per month 

 ## AWS Advantages 
 - No need to maintian servers 
 - No need for SSL certification or verifying the incoming request are coming form Alexa service
 - AWS Lambda runs your code only when you need it and scales with your usage.
 - For most developers, the Lambda free tier is suffienct for the functions of Alexa skill
 - AWS Lambda supports JAVA, **Node.js**, C#, and Python code, with support for other languages. 

 ## Start Skill 
 - Login to AWS Account (AWS) -aws.amazon.com
 - Login to Alexa Developer account (ADA) https://developer.amazon.com/edw/home.html#/skills
   
##ADA
1.  Click on Alexa on Top > Alexa skill kit 'Get Started' > Add New Skill 
        - Fill in Skill Information
            - Skill Type *Custom Interaction Model
            - Language English
            - Name > "Skill name"
            - Invocation Name > "Skill name" 
            - Audio Player 'no'
            - Save > Next
2. Interaction Model 
            - Intent Schema
```javascript
{
  "intents": [
    {
      "slots": [
        {
          "name": "FirstName",
          "type": "GUEST_NAMES"
        }
      ],
      "intent": "HelloIntent"
    }
  ]
}
```
3. 
    -  Custom Slot Types
        - Enter Type
            - "GUEST_NAME"
                - Person1
                - Person2
                - Person3
            - Sample Utterances
                - HelloIntent say Hello to {FirstName}
                - HelloIntent say Hi to {FirstName}
                - HelloIntent talk to {FirstName}
                - HelloIntent wish {FirstName} 
4. Save > Next

5. Configuration
    -  Select 'AWS Lambda ARN'
        - 'North America'
6. Account Linking 
    - On New Browser Window go to (AWS) > Login
    - Search for Lambda
      - click 'Create a Lambda function' 
      - Select 'Configure triggers'
        - click the box and select 'Alexa Skill Kit' 
        - Next
        - Name 
          - input "skillName"
        - Description
          - Input Description
        - Runtime
          - Node.js 6.10
        - Lambda function code
          - enter code when availiable 
        - Lambda function handler and role
          - Handler
            - index.handler
          - Role
            - "Create Custome Code"
            - Click Allow on the new page
          - Existing role
            - lambda_basic_execution
        - Advanced settings 
          - Memory > 128
          - Timeout 0min 3 sec
        - DLQ Resource
          - ignore (keep default)
        - VPC
          - ignore (keep default)
        - KMS key 
          - ignore (keep default)
      - Next
      - Create Function
      
7. Click Code
8. Insert Code 
```javascript
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
    return response;
}
```

## Add an API and Test Locally

    - Get API from site, free quote api - http://forismatic.com/en/api/
    - Make an api response > http://api.forismatic.com/api/1.0/json?method=getQuote&lang=en&format=json
        - Get JSON Response , For example :- 
```json
{"quoteText":"Man cannot discover new oceans unless he has the courage to lose sight of the shore.", "quoteAuthor":"Andre Gide", "senderName":"", "senderLink":"", "quoteLink":"http://forismatic.com/en/bb87ad583b/"}
```

- Add getQuote `code` in index.js
- Set up local lambda machine for testing locally
> npm install -g lambda-local
- Run the following command to test entire testing flow locally
> lambda-local -l index.js -h handler -e event.json

## Test using Web Version
- https://echosim.io/

## SSML - Speech synthesis markup language
- Amazon reference link > https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference

## AWSCLI 
- Download Pythong 2.7.1 if you don't have it 
- run command 
> pip install awscli
> aws configure
- Follow these steps if aws configure DOES NOT WORK, getting Command not found
1. Make sure Correct Python from Terminal
> `python --version`

2. Run this Command
> curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"

3. Unzip the package
> unzip awscli-bundle.zip

4. Run the install 
> sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws

5. Run the command aws configure 
> aws configure 

- These steps should Work 