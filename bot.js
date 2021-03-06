'use strict';

// Weather Example
// See https://wit.ai/sungkim/weather/stories and https://wit.ai/docs/quickstart
const Wit = require('node-wit').Wit;
const FB = require('./facebook.js');
const Config = require('./const.js');
const dat = require('./data.js');

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

// Bot actions
const actions = {
  say(sessionId, context, message, cb) {
    console.log(message);

    // Bot testing mode, run cb() and return
    if (require.main === module) {
      cb();
      return;
    }

    // Our bot has something to say!
    // Let's retrieve the Facebook user whose session belongs to from context
    // TODO: need to get Facebook user name
    // const recipientId = context._fbid_;
    // if (recipientId) {
    //   // Yay, we found our recipient!
    //   // Let's forward our bot response to her.
    //   FB.fbMessage(recipientId, message, (err, data) => {
    //     if (err) {
    //       console.log(
    //         'Oops! An error occurred while forwarding the response to',
    //         recipientId,
    //         ':',
    //         err
    //       );
    //     }

    //     // Let's give the wheel back to our bot
    //     cb();
    //   });
    // } else {
    //   console.log('Oops! Couldn\'t find user in context:', context);
    //   // Giving the wheel back to our bot
    //   cb();
    // }
    cb();
  },
  merge(sessionId, context, entities, message, cb) {
    // Retrieve the location entity and store it into a context field
    const ques = firstEntityValue(entities, 'question');
    context.question = ques;

    cb(context);
  },

  error(sessionId, context, error) {
    console.log(error.message);
  },

  // fetch-weather bot executes
  ['getAnswer'](sessionId, context, cb) {
    let msg = {text: "Sorry but I am unable to undersatnd your query. Please Contact Shahzil at shazy792@gmail.com "};
    switch(context.question.trim()){
      case 'education':
      case 'school':
        msg = dat.messageEducation;
      break;
      case 'skills':
        msg = dat.messageSkills;
      break;
      case 'work':
      case 'experience':
        FB.fbMessage(
          context._fbid_,
          {text: "Here is some of my previous work history."}
          );
        msg = dat.messageWork;
      break;
      case 'projects':
        FB.fbMessage(
          context._fbid_,
          {text: "Here are some of the projects that I have worked on."}
          );
        msg = dat.messageProjects;
      break;
      case 'personal':
        msg = {text: "I am the President of the Pakistani Student Association and a member of the IEEE & ACM associations at my university."};
      break;
      case 'contact':
        FB.fbMessage(
          context._fbid_,
          {text: "Contact Info"}
          );
        msg = dat.messageContact;
      break;
      case 'achievements':
        FB.fbMessage(
          context._fbid_,
          {text: "Here are some of my Achievements and Awards"}
          );
        msg = dat.messageAwards;
      break;
      case 'question':
        msg = {text: "You can ask about my Education, Work Experience, Skills, Projects, Personal Experience and Achievements"}
      break;
      default:
        msg = {text: "Sorry but I am unable to undersatnd your query. Please Contact Shahzil at shazy792@gmail.com "}
    }

    FB.fbMessage(context._fbid_, msg);
    //console.log("Conetxt: ", context);
    cb(context);
  },
};


const getWit = () => {
  return new Wit(Config.WIT_TOKEN, actions);
};

exports.getWit = getWit;

// bot testing mode
// http://stackoverflow.com/questions/6398196
if (require.main === module) {
  console.log("Bot testing mode.");
  const client = getWit();
  client.interactive();
}