// ==UserScript==
// @name         Coockie Clicker Bot
// @namespace    https://github.com/ulou
// @version      0.51b
// @description  Bot who plays CoockieClicker for you!
// @author       https://github.com/ulou
// @include      http://orteil.dashnet.org/cookieclicker/
// @updateURL    https://raw.githubusercontent.com/ulou/CookieClikerBot/master/CoockieClicker.js
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// Your code here...

var bot_running = false;
var threads = [];

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

    // click BigCookie 100 times per sec
    var clickerInterval = setInterval(function() {
        $("#bigCookie").click();
    }, 10);

    threads = [clickerInterval];
    bot_running = true;
    console.log("Bot Started.");
    findBestProduct();
    findBestUpgrade();
    $getToggleBot().text("Stop Bot");
}

function botStop(){
    $getToggleBot().text("Start Bot");
    if (!bot_running)
        return;
    for (var i = 0; i < threads.length; i++)
        clearInterval(threads[i]);
    bot_running = false;
    console.log("Bot Stoped.");
}

function findBestProduct() {
    var productInterval = setInterval(function () {
        var productsRatio = [,];

        for (var i = 0; i < Game.ObjectsById.length; i++) {
            productsRatio[i] = {
                id: Game.ObjectsById[i].id,
                ratio: Game.ObjectsById[i].storedCps / Game.ObjectsById[i].price
            };
        }

        productsRatio.sort(function (a, b) {
            if (a.ratio > b.ratio) {
                return -1;
            }
            if (a.ratio < b.ratio) {
                return 1;
            }
            return 0;
        });

        console.log(productsRatio);

        for (var i = 0; i < 5; i++)
            $("#product" + productsRatio[i].id).click();
    }, 10000);

    threads.push(productInterval);
}

function findBestUpgrade() {
    var upgradesInterval = setInterval(function () {
        //var upgrades = [,];
        for (var i = 0; i < Game.UpgradesInStore.length; i++) {
            // upgrades[i] = Game.UpgradesInStore[i].id;
            $("#upgrade" + i).click();
        }

    }, 10000);

    threads.push(upgradesInterval);
}


function $getToggleBot(){
    var $toggle = $("#botToggle");

    if($toggle.length === 0) {
        $toggle = $("<a id='botToggle'>Toggle Bot</a>");
        $toggle.on("click", function(){
            if(bot_running){
                botStop();
            } else if (!bot_running) {
                botStart();
            }
        });
        $toggle.css("cursor", "pointer");
        $toggle.insertBefore("#sectionMiddle #logButton");
    }

    return $toggle;
}

// init bot
addJQueryAndBegin();