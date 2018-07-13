# Running the Sample Code

Following are the requirements (and necessary steps) to run this sample.

## I. Local Dependencies
1. Download and install node.js (version >= 6.11.3, the current LTS version as of this writing) for your platform from [nodejs.org](http://nodejs.org).
1. Download and install the [Microsoft Bot Framework Emulator](https://docs.microsoft.com/en-us/bot-framework/debug-bots-emulator) for your platform (unless you want to actually deploy the bot to a real chat platform e.g., Facebook Messenger, Slack, Skype for further experimentation).
1. Clone or download the code and run `npm install` from the `/code/` folder to resolve the dependencies declared in `packages.json`.

## II. Azure / Cognitive Service Dependencies

Each of the Cognitive Services dependencies requires a [Microsoft Azure account](https://azure.microsoft.com/en-us/free/) into which the services must be provisioned.  However, _all_ of these services upon which the bot depends are available in a "free tier" that provides sufficient throughput at the cost-free level to easily run this sample (meaning that this sample _can_ be run on Azure at no cost to you).

### Language Understanding Intelligence Service (LUIS)
1. Access [the LUIS portal](http://luis.ai) to login and create a new LUIS application instance.  The `LUIS_app_definition.json` file in the `/code/` folder is an exported LUIS application definition.  For convenience, this can be imported into the LUIS portal to quickly (re)create the NLP model that was demonstrated in the talk.
1. Configure an instance of the Language Understanding Intelligence Service (LUIS) via [the Azure portal](http://portal.azure.com).  __Note the application key for the deployed service.__
1. Apply this key to the app you have defined in the [LUIS portal](http://luis.ai) in the prior step.
1. Train and Publish the LUIS model.  __Make a note of the published URL for your app/model.__

### Text Analytics
1. Using the [Azure portal](http://portal.azure.com) deploy an instance of the Text Analytics Service.
1. __Make note of the API key for the service.__

### Bing Spellcheck Service
1. Using the [Azure portal](http://portal.azure.com) deploy an instance of the Bing Spellcheck Service.
1. __Make note of the API key for the service.__

### Bing Translation Service
1. Using the [Azure portal](http://portal.azure.com) deploy an instance of the Bing Translation Service.
1. __Make note of the API key for the service.__

## III. Application Setting Dependencies

The system requires multiple configuration values to function.  The application reads all of these values by accessing a `config` object declared in the `configuration.js` file.  The `config` object is designed as follows:

```js
var config = {
    botConnectorAppId: process.env.WEATHERBOT_BOT_CONNECTOR_APP_ID,
    botConnectorAppPassword: process.env.WEATHERBOT_BOT_CONNECTOR_APP_PASSWORD,
    spellcheckServiceApiKey: process.env.WEATHERBOT_SPELLCHECK_KEY,
    textAnalyticsServiceApiKey: process.env.WEATHERBOT_TEXTANALYTICS_KEY,
    textTranslationServiceApiKey: process.env.WEATHERBOT_TEXTTRANSLATION_KEY,
    luisServiceUrl: process.env.WEATHERBOT_LUIS_URL,
};
```

The first two properties, `botConnectorAppId` and `botConnectorAppPassword`, are only required to be set if/when you are ready to connect the bot to an actual chat channel _other_ than the bot framework emulator (e.g., Facebook Messenger, Slack, Skype).  If you _only_ plan to run the emulator to communicate with the bot, these two values are _not_ required.

However, each of the other variables _must have values provided in order for the application to function properly_.  These values are the e.g., API keys, URLs that you collected when provisioning each of the Cognitive Services in the earlier steps.

These values can be set in one of the following ways:

1. Set the necessary environment variables on your system.  The calls to `process.env.VARIABLE_NAME` in `configuration.js` will then read those values at run-time.
1. Edit the `configuration.js` file to replace the various `process.env.VARIABLE_NAME` lines with their literal values.
1. The code has been written to leverage [the `dotenv` npm package](https://www.npmjs.com/package/dotenv).  This package looks for a special file in the root of the application named `.env` and if found will read pseudo-environment-variable settings from that file instead.  Following is a sample .env file that could satisfy the requirements of this bot:

```code
WEATHERBOT_SPELLCHECK_KEY="YOUR_KEY(GUID)_HERE"
WEATHERBOT_TEXTANALYTICS_KEY="YOUR_KEY(GUID)_HERE"
WEATHERBOT_TEXTTRANSLATION_KEY="YOUR_KEY(GUID)_HERE"
WEATHERBOT_LUIS_URL="YOUR_URL_HERE"
```

## IV. Run the Bot

When you're ready, do the following to interact with the bot:

1. Run the app with node by launching the `index.js` file from the root of the `/code/` folder.
1. Launch the Bot Framework Emulator and connect to the running bot.
1. Interact and experiment with the bot.

### Special Note

For simplicity, the data that the bot uses to satisfy weather inquiries is _hard-coded_ into the `weatherData.js` file rather than querying an actual weather service.  The data provides weather for the next ten days into the future (from the current date) for two locations, New York and Chicago.  Requests to the bot for forecasts outside those date ranges and/or those locations will be met with some variant of "I'm sorry I don't have data for that". 