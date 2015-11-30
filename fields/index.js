"use strict";

module.exports = [
    "text",
    "number",
    "select",
    "tabs"
];

module.exports.components = {
    "text" : {
        edit : require("./text-edit"),
        show : require("./text-show")
    },
    
    "select" : {
        edit : require("./select-edit"),
        show : require("./select-show")
    },
    
    "number" : {
        edit : require("./number-edit"),
        show : require("./number-show")
    }
};
