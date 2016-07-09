'use strict';

// Weather Example
// See https://wit.ai/sungkim/weather/stories and https://wit.ai/docs/quickstart
const Wit = require('node-wit').Wit;
const FB = require('./facebook.js');
const Config = require('./const.js');

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
    /*const recipientId = context._fbid_;
    if (recipientId) {
      // Yay, we found our recipient!
      // Let's forward our bot response to her.
      FB.fbMessage(recipientId, message, (err, data) => {
        if (err) {
          console.log(
            'Oops! An error occurred while forwarding the response to',
            recipientId,
            ':',
            err
          );
        }

        // Let's give the wheel back to our bot
        cb();
      });
    } else {
      console.log('Oops! Couldn\'t find user in context:', context);
      // Giving the wheel back to our bot
      cb();
    }*/
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
    // Here should go the api call, e.g.:
    // context.forecast = apiCall(context.loc)
    // Add Question Handler Here!!
    questionHandler(context,cb);
    /*let messageSkills = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                    "text": "What of my skills would you like to know?",
                    "buttons": [{
                        "type": "postback",
                        "title": "Programming languages",
                        "payload": "sx1"
                    }, {
                        "type": "postback",
                        "title": "Hardware Boards",
                        "payload": "sx2",
                    }, {
                        "type": "postback",
                        "title": "Database Engines",
                        "payload": "sx3",
                    }],
            }
        }
    }

    FB.fbMessage(context._fbid_,messageSkills,cb)*/
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

// Function to handle data response to the Queries made by wit
function questionHandler(context, cb){
  switch(context.question){
    case 'education':
      let mes = {text: "Yo " + context.question};
      FB.fbMessage(
        context._fbid_,
        mes,
        cb
        );
    break;
    case 'skills':
      let mes = {text: "Yo " + context.question};
      FB.fbMessage(
        context._fbid_,
        mes,
        cb
        );
    break;
    case 'experience':
      let mes = {text: "Yo " + context.question};
      FB.fbMessage(
        context._fbid_,
        mes,
        cb
        );
    break;
    case 'personal':
      let mes = {text: "Yo " + context.question};
      FB.fbMessage(
        context._fbid_,
        mes,
        cb
        );
    break;
    case 'projects':
      let mes = {text: "Yo " + context.question};
      FB.fbMessage(
        context._fbid_,
        mes,
        cb
        );
    break;
    default:
      let mes = {text: "I am sorry but I don't know anything about " + context.question + ", Please contact Shahzil for more information"};
      FB.fbMessage(
        context._fbid_,
        mes,
        cb
        );
  }

}