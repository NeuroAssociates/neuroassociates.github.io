/*
    seastack.js

    This source file is part of the Neuro Associastes web site project

    Copyright (c) 2020 Neuro Associates Co., Ltd.
    Licensed under MIT Licsense 
*/

'use strict'

var seastack = {
    init: function() {
        this.findElements(document.getElementsByTagName("body"));
    },

    findElements: function(elements) {
        if (!(elements instanceof HTMLCollection) || elements.length < 1) return;

        console.log(elements);

        console.log(elements)
    }
};

window.onload = function() {
    this.seastack.init();
}