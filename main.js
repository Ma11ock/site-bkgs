"use strict";
// This file loads a random background.

// List of script paths.
let bkgScripts = ['conway.js'];
let urlPrefix = 'https://www.ryanmj.xyz/scripts/site-bkgs/';
// A randomly selected script.
let randomScript = bkgScripts[Math.floor(Math.random() * bkgScripts.length)];


// Adding the script tag to the head as suggested before
let head = document.head;
let script = document.createElement('script');

script.type = 'text/javascript';
script.src = urlPrefix + randomScript;

// Fire the loading
head.appendChild(script);
