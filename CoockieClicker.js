// ==UserScript==
// @name         Coockie Clicker Bot
// @namespace    https://github.com/ulou
// @version      0.1
// @description  Bot who plays CoockieClicker for you!
// @author       https://github.com/ulou
// @include        http://orteil.dashnet.org/cookieclicker/
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...

var bot_running = false;

function addJQueryAndBegin(){
    //noinspection JSUnresolvedVariable
    if(typeof jQuery === "undefined"){
        var scriptTag = document.createElement("script");
        scriptTag.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js";
        scriptTag.onload = function(){
            botStop();
        };
        document.body.appendChild(scriptTag);
    } else {
        botStop();
    }
}

function botStart(){
    var clickerInterval = setInterval(function() {
        $("#bigCookie").click();
    }, 10);

    bot_running = true;
    console.log("Bot Started.");
    $getToggleBot().text("Stop Bot");
}

function botStop(){
    bot_running = false;
    console.log("Bot Stoped.");
    $getToggleBot().text("Start Bot");
}

function $getToggleBot(){
    var $toggle = $("#botToggle");

    if($toggle.length === 0) {
        $toggle = $("<a id='botToggle'>Toggle Bot</a>");
        $toggle.on("click", function(){
            if(bot_running){
                botStop();
            } else{
                botStart();
            }
        });
        $toggle.css("cursor", "pointer");
//        $toggle.insertAfter("#sectionMiddle #statsButton");
        $toggle.insertBefore("#sectionMiddle #logButton");
    }

    return $toggle;
}

// init bot
addJQueryAndBegin();