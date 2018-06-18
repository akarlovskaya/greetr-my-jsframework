// create IIFE to prevent accessing varibles within IIFE and polluting global scope, using ';' in the beginning helps in case of using another code before current one with no ';' in the end
// js executes IIFE and creates execution context for function with two variables global object (global) and jQuery ($)
;(function(global, $){
    // function that generates and returns Greetr object
    var Greetr = function(firstName, lastName, language) {
        // for avoiding typing NEW in new object we create another function constructor "Greetr.init()"" (like jQuery does) returning  object with key word "new"
        return new Greetr.init(firstName, lastName, language);
    };
    // hidden within the scope of the IIFE and never directly accessible
    // but accessible for an object via clouser
    var supportedLangs = ['en', 'es'];
    // create objects to be accessible in methods by key/value pair (via languages)
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    var formalGreeting = {
        en: "Greetings",
        es: 'Saludos'
    };

    var logMessages = {
        en: 'Log in',
        es: 'Inició sesión'
    };

    // prototype holds methods (to save memory space)
    Greetr.prototype = {
        // 'this' refers to the calling object at execution time
        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        },

        validate: function(){
            //check that is a valid language - if lang is not supported, throw an error
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        // retrieve messages from object by referring to properties using [] syntax
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreeting: function() {
            return formalGreeting[this.language] + ', ' + this.fullName();
        },

        // create chainable greeting methods
        greet: function(formal) {
            var msg;
            // if undefined or null it will be coerced to false
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            // check if 'console' object is available
            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at exucution time
            // makes the mathod chainable
            return this;
        },

        log: function() {
            if (console) {
                console.log(
                    logMessages[this.language] + ': ' + this.fullName()
                );
            }
            // makes the method chainable:
            return this;
        },

        // change lang on the fly
        setLang: function(lang){
            // set the language
            this.language = lang;
            // validate
            this.validate();
            // make chainable
            return this;
        },

        // add method to manipulate with jQuery selector
        htmlSelector: function (selector, formal) {
            // check if jQuery exists
            if (!$) {
                throw 'jQuery not loaded';
            }

            if (!selector) {
                throw 'Missing jQuery selector';
            }

            // determine the message
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            // inject the message in the chosen place in the DOM
            $(selector).html(msg);

            // make chainable
            return this;
        }
    };// end Greetr.prototype

    // the actual Greetr object is created here with three properties with default values
    Greetr.init = function(firstName, lastName, language) {
        // "self" will be pointing to a new object
        var self = this;
        // set default properties
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
    };
    // set Greetr.init's prototype to point to Greetr prototype
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;
    // attach Greetr function to global object to access it everywhere and set shorthand name as G$
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));
