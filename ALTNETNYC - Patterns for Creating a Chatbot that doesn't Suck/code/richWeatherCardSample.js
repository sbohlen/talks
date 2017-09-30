module.exports = {
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.0",
    "speak": "<s>Weather forecast for Monday is high of 62 and low of 42 degrees with a 20% chance of rain</s><s>Winds will be 5 mph from the northeast</s>",
    "backgroundImage": "http://messagecardplayground.azurewebsites.net/assets/Mostly Cloudy-Background-Dark.jpg",
    "body": [
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "width": "35",
                    "items": [
                        {
                            "type": "Image",
                            "url": "http://messagecardplayground.azurewebsites.net/assets/Mostly Cloudy-Square.png",
                            "size": "stretch"
                        }
                    ]
                },
                {
                    "type": "Column",
                    "width": "65",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "Monday April 1",
                            "weight": "bolder",
                            "size": "large",
                            "color": "light"
                        },
                        {
                            "type": "TextBlock",
                            "text": "63 / 42",
                            "size": "medium",
                            "spacing": "none"
                        },
                        {
                            "type": "TextBlock",
                            "isSubtle": true,
                            "text": "20% chance of rain",
                            "spacing": "none"
                        },
                        {
                            "type": "TextBlock",
                            "isSubtle": true,
                            "text": "Winds 5 mph NE",
                            "spacing": "none"
                        }
                    ]
                }
            ]
        },
        {
            "type": "ColumnSet",
            "columns": [
                {
                    "type": "Column",
                    "width": "20",
                    "items": [
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "center",
                            "wrap": false,
                            "text": "Fri"
                        },
                        {
                            "type": "Image",
                            "size": "auto",
                            "url": "http://messagecardplayground.azurewebsites.net/assets/Mostly Cloudy-Square.png"
                        },
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "center",
                            "wrap": false,
                            "text": "62"
                        },
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "center",
                            "isSubtle": true,
                            "wrap": false,
                            "text": "52",
                            "spacing": "none"
                        }
                    ],
                    "selectAction": {
                        "type": "Action.OpenUrl",
                        "url": "http://www.microsoft.com"
                    }
                },
                {
                    "type": "Column",
                    "width": "20",
                    "items": [
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "center",
                            "wrap": false,
                            "text": "Sat"
                        },
                        {
                            "type": "Image",
                            "size": "auto",
                            "url": "http://messagecardplayground.azurewebsites.net/assets/Drizzle-Square.png"
                        },
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "center",
                            "wrap": false,
                            "text": "60"
                        },
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "center",
                            "isSubtle": true,
                            "wrap": false,
                            "text": "48",
                            "spacing": "none"
                        }
                    ],
                    "selectAction": {
                        "type": "Action.OpenUrl",
                        "url": "http://www.microsoft.com"
                    }
                },
                {
                    "type": "Column",
                    "width": "20",
                    "items": [
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "center",
                            "wrap": false,
                            "text": "Sun"
                        },
                        {
                            "type": "Image",
                            "size": "auto",
                            "url": "http://messagecardplayground.azurewebsites.net/assets/Mostly Cloudy-Square.png"
                        },
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "center",
                            "wrap": false,
                            "text": "59"
                        },
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "center",
                            "isSubtle": true,
                            "wrap": false,
                            "text": "49",
                            "spacing": "none"
                        }
                    ],
                    "selectAction": {
                        "type": "Action.OpenUrl",
                        "url": "http://www.microsoft.com"
                    }
                },
                {
                    "type": "Column",
                    "width": "20",
                    "items": [
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "center",
                            "wrap": false,
                            "text": "Mon"
                        },
                        {
                            "type": "Image",
                            "size": "auto",
                            "url": "http://messagecardplayground.azurewebsites.net/assets/Mostly Cloudy-Square.png"
                        },
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "center",
                            "wrap": false,
                            "text": "64"
                        },
                        {
                            "type": "TextBlock",
                            "horizontalAlignment": "center",
                            "isSubtle": true,
                            "wrap": false,
                            "text": "51",
                            "spacing": "none"
                        }
                    ],
                    "selectAction": {
                        "type": "Action.OpenUrl",
                        "url": "http://www.microsoft.com"
                    }
                }
            ]
        }
    ]
};