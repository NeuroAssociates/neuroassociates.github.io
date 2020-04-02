/*
    seastack.js

    This source file is part of the Neuro Associastes web site project

    Copyright (c) 2020 Neuro Associates Co., Ltd.
    Licensed under MIT Licsense 
*/

'use strict'

var seastack = {
    init: function() {
        this.findElements(document.body);

        // To-be: findElement().findData().replaceElement()...
    },

    findElements: function(elements) {
        if (!(elements instanceof HTMLElement)) return;

        let entryElements = ["TITLE", "HEADER", "NAV", "FOOTER", "ARTICLE", "SECTION", "UL", "LI", "H1", "H2", "DIV", "SPAN", "P", "SVG", "A"];
        
        entryElements.map(entryElement => {
            
            Array.from(elements.getElementsByTagName(entryElement)).forEach((element) => {

                let seaSource = element.getAttribute("sea-source");
                        
                if (seaSource !== null && seaSource.length > 0) {
                    this.replaceElementInnerHTML(element, seaSource);
                }
            });
        });
    },

    findElementData: function(elements) {

    },

    replaceElementInnerHTML: function(element, seaSource) {
        if (!(element instanceof HTMLElement) || seaSource == null || seaSource.length < 1) return;
        console.log("" + element + " / " + seaSource);
        
        fetch(seaSource)
        .then((response) => {
            // return response.json();
            console.log("response :");
            console.log(response);
            return response.text();
        })
        .then((html) => {
            console.log("html :");
            console.log(html);


            
            element.innerHTML = html;
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    this.seastack.init();
}, false);