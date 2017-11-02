ERM - SIRA

Pre-Requisites and Dependencies:
1. Node.JS
	Download Path - https://nodejs.org/en/download/
	
2. Cordova
	Run the following command from Command Prompt - 
	Windows:
	$ npm install -g cordova
	Mac:
	$ sudo npm install -g cordova

3. Ionic CLI tools
	Run the following command from Command Prompt - 
	Windows:
	$ npm install -g ionic@latest
	Mac:
	$ sudo npm install -g ionic@latest

Code Setup:
After downloading the code, locate the package.json file. Open command prompt at this folder and run the below command to install node modules:
Windows:
$ npm install
Mac:
$ sudo npm install

Android Build:
To build the code for Android devices, run the below commands:

$ ionic cordova platform add android
$ ionic cordova plugin add cordova.plugins.diagnostic
$ ionic cordova plugin add cordova-pdf-generator
$ ionic cordova plugin add cordova-plugin-compat
$ ionic cordova plugin add cordova-plugin-console
$ ionic cordova plugin add cordova-plugin-device
$ ionic cordova plugin add cordova-plugin-email
$ ionic cordova plugin add cordova-plugin-file
$ ionic cordova plugin add cordova-plugin-nativestorage
$ ionic cordova plugin add cordova-plugin-splashscreen
$ ionic cordova plugin add cordova-plugin-statusbar$
$ ionic cordova plugin add cordova-plugin-whitelist
$ ionic cordova plugin add ionic-plugin-keyboard
$ ionic cordova resources android
$ ionic cordova build android

The apk file will be created in \platforms\android\build\outputs\apk\android-debug.apk

iOS Build:
To build the code for iOS devices, run the below commands:

$ ionic cordova platform add ios
$ ionic cordova plugin add cordova.plugins.diagnostic
$ ionic cordova plugin add cordova-pdf-generator
$ ionic cordova plugin add cordova-plugin-compat
$ ionic cordova plugin add cordova-plugin-console
$ ionic cordova plugin add cordova-plugin-device
$ ionic cordova plugin add cordova-plugin-email
$ ionic cordova plugin add cordova-plugin-file
$ ionic cordova plugin add cordova-plugin-nativestorage
$ ionic cordova plugin add cordova-plugin-splashscreen
$ ionic cordova plugin add cordova-plugin-statusbar
$ ionic cordova plugin add cordova-plugin-whitelist
$ ionic cordova plugin add ionic-plugin-keyboard
$ ionic cordova resources ios
$ ionic cordova build ios
