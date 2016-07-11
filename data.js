// All the data goes over here, including the handler..?
'use strict';
// const messageSuggestions = {
//         "attachment": {
//             "type": "template",
//             "payload": {
//                 "template_type": "button",
//                     "text": "What would you like to know about me?",
//                     "buttons": [{
//                         "type": "postback",
//                         "title": "Education",
//                         "payload": "Education"
//                     }, {
//                         "type": "postback",
//                         "title": "Skills",
//                         "payload": "Skills",
//                     }, {
//                         "type": "postback",
//                         "title": "Experience",
//                         "payload": "Experience",
//                     }],
//             }
//         }
//     }

const messageEducation = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Electrical Engineering",
                    "subtitle": "2019 at Illinois Institute of Technology",
                    //"image_url": "https://www.royalcanin.com/~/media/Royal-Canin/Product-Categories/cat-adult-landing-hero.ashx",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://web.iit.edu/",
                        "title": "My University"
                    }],
                }, {
                    "title": "A Levels",
                    "subtitle": "2015 at The City Schools",
                    //"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "http://thecityschool.edu.pk/category/central-region/iqbal-campus-sialkot/",
                        "title": "My School",
                    }],
                }]
            }
        }
    }

const messageSkills = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                    "text": "What of my skills would you like to know?",
                    "buttons": [{
                        "type": "postback",
                        "title": "Software Languages",
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

const messagePLangs = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Java",
                    "image_url": "http://www.greycampus.com/system/courses/JAVA.jpg",
                   	"item_url": "https://en.wikipedia.org/wiki/Java_(programming_language)",
                }, {
                    "title": "Python",
                    "image_url": "https://realpython.com/learn/python-first-steps/images/pythonlogo.jpg",
                    "item_url": "https://en.wikipedia.org/wiki/Python_(programming_language)",
                }, {
                    "title": "Visual Basic .Net/6",
                    "image_url": "https://regmedia.co.uk/2013/11/13/visual_studio.jpg?x=1200&y=794",
                    "item_url": "https://en.wikipedia.org/wiki/Visual_Basic_.NET",
                }, {
                    "title": "Android",
                    "image_url": "http://logok.org/wp-content/uploads/2014/06/Android-logo-wordmark.png",
                    "item_url": "https://en.wikipedia.org/wiki/Android_(operating_system)",
                }]
            }
        }
    }

const messageHBoards = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "generic",
            "elements": [{
                "title": "Arduino",
                "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Arduino_Logo.svg/1280px-Arduino_Logo.svg.png",
               	"item_url": "https://www.arduino.cc/",
            }, {
                "title": "Raspberry Pi",
                "image_url": "http://www.instructables.com/files/orig/FYC/48KX/IJ1TY4LH/FYC48KXIJ1TY4LH.png",
                "item_url": "https://www.raspberrypi.org/",
            }, {
                "title": "ESP8266",
                "image_url": "http://visystem.ddns.net:7442/imagenes/esp8266.png",
                "item_url": "https://en.wikipedia.org/wiki/ESP8266",
            }]
        }
    }
}

const messageDatabase = {
    "attachment": {
        "type": "template",
        "payload": {
            "template_type": "generic",
            "elements": [{
                "title": "Microsoft Access",
                "image_url": "http://www.accessrepairnrecovery.com/blog/wp-content/uploads/2015/07/Microsoft-Access-Course.jpg",
               	"item_url": "https://en.wikipedia.org/wiki/Microsoft_Access",
            }]
        }
    }
}

const messageWork = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Student Employment Office, Illinois Institute of Technology",
                    "subtitle": "Student Assistant 2016 - Date",
                    //"image_url": "https://www.royalcanin.com/~/media/Royal-Canin/Product-Categories/cat-adult-landing-hero.ashx",
                    "buttons": [{
                        "type": "postback",
                        "title": "My Tasks Here",
                        "payload": "ex1",
                    }],
                }, {
                    "title": "Research and Development, Key Sports Pvt Ltd.",
                    "subtitle": "Intern 2014 - 2015",
                    //"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "My Tasks Here",
                        "payload": "ex2",
                    }],
                }, {
                    "title": "IT Department, Standard Chartered Bank",
                    "subtitle": "Intern Summer 2014",
                    //"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "My Tasks Here",
                        "payload": "ex3",
                    }],
                }, {
                    "title": "Public Relations, Key Sports Pvt Ltd.",
                    "subtitle": "Intern 2012 - 2014",
                    //"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "My Tasks Here",
                        "payload": "ex4",
                    }],
                }]
            }
        }
    }

const messageProjects = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Home Automation System",
                    //"subtitle": "Student Assistant 2016 - Date",
                    //"image_url": "https://www.royalcanin.com/~/media/Royal-Canin/Product-Categories/cat-adult-landing-hero.ashx",
                    "buttons": [{
                        "type": "postback",
                        "title": "Learn More",
                        "payload": "px1",
                    }],
                }, {
                    "title": "Line Following Robot",
                    //"subtitle": "Intern 2014 - 2015",
                    //"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Learn More",
                        "payload": "px2",
                    }],
                }, {
                    "title": "Facebook Messenger Chatbot",
                    //"subtitle": "Intern 2014 - 2015",
                    //"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Learn More",
                        "payload": "px3",
                    }],
                }, {
                    "title": "Hotel Management System",
                    //"subtitle": "Intern 2012 - 2014",
                    //"image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Learn More",
                        "payload": "px4",
                    }],
                }]
            }
        }
    }

// Whatever I am going to use outside of this file.
module.exports = {
  messageDatabase: messageDatabase,
  messageHBoards: messageHBoards,
  messagePLangs: messagePLangs,
  messageSkills: messageSkills,
  messageEducation: messageEducation,
  messageWork: messageWork,
  messageProjects: messageProjects,
};