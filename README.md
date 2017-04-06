# Roncho Alexa Skill

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



        


               
