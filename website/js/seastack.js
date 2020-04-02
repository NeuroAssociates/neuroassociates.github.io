/*
    seastack.js

    This source file is part of the Neuro Associastes web site project

    Copyright (c) 2020 Neuro Associates Co., Ltd.
    Licensed under MIT Licsense 
*/

'use strict'

var seaStack;
(function(seaStack) {

    var seaElements = [];

    function init(element) {
        if (!(element instanceof HTMLElement)) return;

        this.findElements(element).replaceHTML();
    }
    seaStack.init = init;

    function findElements(rootElement) {

        if (!(rootElement instanceof HTMLElement)) return;

        this.seaElements = [];

        let entryElements = ["TITLE", "HEADER", "NAV", "FOOTER", "ARTICLE", "SECTION", "UL", "LI", "H1", "H2", "DIV", "SPAN", "P", "SVG", "A"];
        
        entryElements.map(entryElement => {
        
            Array.from(rootElement.getElementsByTagName(entryElement)).forEach((element) => {

                let seaSource = element.getAttribute("sea-source");
                let seaData = element.getAttribute("sea-data");
                        
                if (seaSource !== null && seaSource.length > 0) {
                    this.seaElements.push({
                        "element": element,
                        "seaSource": seaSource,
                        "seaData": seaData
                    });
                }
            });
        });

        return this;
    }
    seaStack.findElements = findElements;

    function replaceHTML() {
        
        if (!(this.seaElements instanceof Array)) return;

        this.seaElements.map(seaElement => {
        
            let element = seaElement.element;
            let seaSource = seaElement.seaSource;
            let seaData = seaElement.seaData;

            if (!(element instanceof HTMLElement) || seaSource == null || seaSource.length < 1) return;

            fetch(seaSource)
            .then((response) => {
                return response.text();
            })
            .then((html) => {
                
                if (seaData != null && seaData.length > 0) {

                    fetch(seaData)
                    .then((response) => {
                        return response.json();
                    })
                    .then((json) => {
                        element.innerHTML = this.replaceDataToHTML(html, json);
                    });

                } else {
                    element.innerHTML = html;
                }                
            });
        });
        
        return this;
    }
    seaStack.replaceHTML = replaceHTML;

    function replaceDataToHTML(html, json) {
        
        if (json == null || json.seaData == null) return;
        
        let element = document.createElement("seaData");
        element.innerHTML = html;
        
        json.seaData.map(data => {
        
            let entryElements = ["TITLE", "HEADER", "NAV", "FOOTER", "ARTICLE", "SECTION", "UL", "LI", "H1", "H2", "DIV", "SPAN", "P", "SVG", "A", "IMG"];
            
            entryElements.map(entryElement => {
        
                Array.from(element.getElementsByTagName(entryElement)).forEach((element) => {
        
                    let seaAttributeName = element.getAttribute("sea-attribute-name");
                    let seaAttributeValue = element.getAttribute("sea-attribute-value");
                    
                    if (seaAttributeName !== null && seaAttributeName.length > 0
                        && seaAttributeValue !== null && seaAttributeValue.length > 0) {

                        element.setAttribute(seaAttributeName, data[seaAttributeValue]);
                    }
                    
                    let seaValue = element.getAttribute("sea-value");
                    
                    if (seaValue !== null && seaValue.length > 0) {
                        element.innerHTML = data[seaValue];
                    }
                });
            });
        });
        
        return element.innerHTML;
    }
    seaStack.replaceDataToHTML = replaceDataToHTML;

})(seaStack || (seaStack = {}));

document.addEventListener('DOMContentLoaded', () => {
    seaStack.init(document.body);
}, false);