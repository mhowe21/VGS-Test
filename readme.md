# VGS example 
In this code example we will send aliased JSON data to the VSG server. And then pull it back down to reveal what was sent. 

## Application requirements
This application runs in a node server you will need to have node installed. You can do that [here](https://nodejs.org/en/download/). 
The application is set by default to run on localhost:3030
To start the application, in the directory in terminal type node server.js
You will need to setup an env file in your packages root directory. 
The env will need to contain the following:
- HTTPS_PROXY_USERNAME={your vault username}
- HTTPS_PROXY_PASSWORD={your vault password}
- VAULT_ID={your vault id}

Depending on your setup you may want to download [ngrok](https://ngrok.com/download) to link your local host with your inbound flow. 
You will also want to include your sandbox.pem (certificate) file in the root directory so the server can find it. 

### Usage:
Once you are setup: simply enter in a cardholder name, fake card number (you can find those [here](https://www.paypalobjects.com/en_AU/vhelp/paypalmanager_help/credit_card_numbers.htm))a expiration date in the future and any 3 digit ccv code. 
You can monitor the json response from the browser console. to see the aliased data.
