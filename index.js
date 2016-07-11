'use strict';

// Messenger API integration example
// We assume you have:
// * a Wit.ai bot setup (https://wit.ai/docs/quickstart)
// * a Messenger Platform setup (https://developers.facebook.com/docs/messenger-platform/quickstart)
// You need to `npm install` the following dependencies: body-parser, express, request.

const bodyParser = require('body-parser');
const express = require('express');

// get Bot, const, Facebook API and Data
const bot = require('./bot.js');
const Config = require('./const.js');
const FB = require('./facebook.js');
const dat = require('./data.js');

// Setting up our bot
const wit = bot.getWit();

// Webserver parameter
const PORT = process.env.PORT || 8445;

// Wit.ai bot specific code

// This will contain all user sessions.
// Each session has an entry:
// sessionId -> {fbid: facebookUserId, context: sessionState}
const sessions = {};

const findOrCreateSession = (fbid) => {
  let sessionId;
  // Let's see if we already have a session for the user fbid
  Object.keys(sessions).forEach(k => {
	if (sessions[k].fbid === fbid) {
	  // Yep, got it!
	  sessionId = k;
	}
  });
  if (!sessionId) {
	// No session found for user fbid, let's create a new one
	sessionId = new Date().toISOString();
	sessions[sessionId] = {
	  fbid: fbid,
	  context: {
		_fbid_: fbid
	  }
	}; // set context, _fid_
  }
  return sessionId;
};

// Starting our webserver and putting it all together
const app = express();
app.set('port', PORT);
app.listen(app.get('port'));
app.use(bodyParser.json());
console.log("I'm wating for you @" + PORT);

// index. Let's say something fun
app.get('/', function(req, res) {
  res.send('"Only those who will risk going too far can possibly find out how far one can go." - T.S. Eliot');
});

// Webhook verify setup using FB_VERIFY_TOKEN
app.get('/webhook', (req, res) => {
  if (!Config.FB_VERIFY_TOKEN) {
	throw new Error('missing FB_VERIFY_TOKEN');
  }
  if (req.query['hub.mode'] === 'subscribe' &&
	req.query['hub.verify_token'] === Config.FB_VERIFY_TOKEN) {
	res.send(req.query['hub.challenge']);
  } else {
	res.sendStatus(400);
  }
});

// The main message handler
app.post('/webhook', (req, res) => {
  // Parsing the Messenger API response
  const messaging = FB.getFirstMessagingEntry(req.body); // Get Postback Event, Check Webhook array

  if (messaging){

	// We retrieve the Facebook user ID of the sender
	const sender = messaging.sender.id;

	  if (messaging.postback){
		// Add postback Handler here.
		let msg = {text: "Sorry but I don't understand your query."};
		switch (messaging.postback["payload"]){
			case 'sx1':
				msg = dat.messagePLangs;
			break;
			case 'sx2':
				msg = dat.messageHBoards;
			break;
			case 'sx3':
				msg = dat.messageDatabase;
			break;
			case 'ex1':
				msg = {text: "I Handled Data Management and Processing for Employment Records and also\
				managed Jobs4Hawks, an online job posting portal."};
			break;
			case 'ex2':
				msg = {text: "I designed and developed the hardware and software fot electrically heated jackets\
				this lead to the company successfully introducing eclectrically heated jackets into the local market."};
			break;
			case 'ex3':
				msg = {text: "I provied technical assistance to the bank empployees and performed routine updates and maintainance of\
				the bank computers."};
			break;
			case 'ex4':
				msg = {text: "I handled Email and Telephonic communication with the companies local and international customers"};
			break;
			default:
				msg = {text: "Payload: " + messaging.postback["payload"]};
		}

		FB.fbMessage(sender, msg);

	  } 

	  else if (messaging.message) {

		// Yay! We got a new message.

		// We retrieve the user's current session, or create one if it doesn't exist
		// This is needed for our bot to figure out the conversation history
		const sessionId = findOrCreateSession(sender);

		// We retrieve the message content
		const msg = messaging.message.text;
		const atts = messaging.message.attachments;
		
		if (atts) {
		  // We received an attachment

		  // Let's reply with an automatic message
		  let mes = {text:'Sorry I can only process text messages for now.'}
		  FB.fbMessage(
			sender,
			mes
		  );
		} else if (msg) {
		  // We received a text message

		  // Let's forward the message to the Wit.ai Bot Engine
		  // This will run all actions until our bot has nothing left to do
		  wit.runActions(
			sessionId, // the user's current session
			msg, // the user's message 
			sessions[sessionId].context, // the user's current session state
			(error, context) => {
			  if (error) {
				console.log('Oops! Got an error from Wit:', error, context);
			  } else {
				
				// Bot has complted its task now it is waiting for further messages.
				console.log('Waiting for futher messages.'); 

				// Based on the session state, you might want to reset the session.
				// This depends heavily on the business logic of your bot.
				// Example:
				// if (context['done']) {
				//   delete sessions[sessionId];
				// }

				// Updating the user's current session state
				sessions[sessionId].context = context;
			  }
			}
		  );
		}
	  }
	}
	  res.sendStatus(200);
});