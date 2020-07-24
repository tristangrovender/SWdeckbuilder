"use strict";
exports.__esModule = true;
exports.dummyDeckData = void 0;
var types_1 = require("../graphql/types");
exports.dummyDeckData = [
    {
        id: "1",
        side: types_1.Side.Dark,
        title: "May the 4th be with you",
        createdAt: new Date(),
        author: { username: "darthvoodoo" },
        description: "Fast paced, high stakes, fun deck",
        averageRating: 3.5
    },
    {
        id: "2",
        side: types_1.Side.Light,
        title: "Princess leia's legion",
        createdAt: new Date(),
        author: { username: "freeForce4you" },
        description: "Slow methodical deck good against many types",
        averageRating: 5
    },
    {
        id: "3",
        side: types_1.Side.Dark,
        title: "PLANET DESTROYER",
        createdAt: new Date(),
        author: { username: "darthWillMaulYou" },
        description: "Weapons galore",
        averageRating: 2.5
    },
    {
        id: "4",
        side: types_1.Side.Light,
        title: "Solo's surprise",
        createdAt: new Date(),
        author: { username: "Falconator" },
        description: "Fast paced, high stakes, fun deck",
        averageRating: 4.5
    },
    {
        id: "5",
        side: types_1.Side.Dark,
        title: "Jar Jar's Jam",
        createdAt: new Date(),
        author: { username: "solo547" },
        description: "Slow methodical deck good against many types",
        averageRating: 3.5
    },
    {
        id: "6",
        side: types_1.Side.Dark,
        title: "Empire",
        createdAt: new Date(),
        author: { username: "Iam Your Father?" },
        description: "Solid all around deck",
        averageRating: 3
    },
];
