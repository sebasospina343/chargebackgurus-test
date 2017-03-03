Chargeback Gurus - Candidate Test / Sebastian Ospina (sebasospina343@gmail.com)

Mini Project: CRUD UI, dynamic charter using D3JS and AngularJS.

INSTALLATION
Using NodeJS and npm you can go to root folder and run in terminal

npm install

And then to start local server

nam start

This command will start a local server in your machine running in localhost:8000. Point your browser to localhost:8000

If you don’t have NodeJS installed in your system, you can place this folder in your localhost folder root and then open the index.html file in your browser

Note: I strongly suggest using the pre-built local server using npm. Running it in a normal local server could impact on AngularJS routes resulting in an error.

Stack and tools used:
NPM
Bower
Gulp
Jasmine
Protractor
Local Web Server
Saas
Javascript
AngularJS 1.5
HTML5
CSS3
JSON
BEM
SVG
Adobe Photoshop

Description: the mini app contains two different parts.
Note: although the app is intended to be cross-browser, some bugs SVG related could appear in Firefox. Chrome recommended. (This can be achieved in the future using a pollyfil framework).

1. Dashboard: allows an user to create Reason Codes and dynamically manipulate them (CRUD operations). Using AngularJS two way data binding, we can create, edit, read and filter the data presented in a dynamic table. There is 3 types of filters which also dynamically filters data by Reason Code Description (as soon as you type at least 3 characters), Card Type (Visa or Mastercard) and Is preventable and reversable status codes. It contains a custom AngularJS filter that limits notes summary to 60 characters. The data is not stored in a permanent way rather in the RAM memory. This can be easily accomplished using a relational data storage or a Non SQL most likely.

2. Reports: allows an user to view different report types on a Date vs Variable chart (Not Fought, True Fraud, Excluded Reason, …). The data is pulled once from a CSV file using AngularJS promises to resolve data once available in an asynchronous way. The chart can by dynamically filtered and visualised by Card Type and On/Off Shore. (Data and aggregator filters are disabled). Also, you can find two types of data visualisation, bars and pie chart. Important to mention that these charts are responsive, which means that every time an user resizes screen, the data is rendered again to adjust to the new screen size using AngularJS model watchers. The charts are rendered using D3JS integrated with the AngularJS benefits. The D3JS framework had been injected to angular through a service.

The charts had been constructed as AngularJS directives with their own scope, allowing isolation and portability to even other apps.

Other characteristics:
SPA using AngularJS $stateProvider states
Implementation of all kind of AngularJS functionalities (controllers, directives, services, filters, built-in services and the $apply function to control digest loop for other scripts happening outside AngularJS)
Custom Javascript AnimationsModule using Javascript design pattern Reveal Module to expose a public API. All the animations within this module had been written for this specific project manipulating DOM elements
Unit tests to test AngularJS filters and controllers. Tests are written in Jasmine. To see tests passing, open the file SpecRunner.html located in test/SpecRunner.html. The test suite file can be found at test/spec.js
Sass as css preprocessor. To see how css was built for this project and syntax used, take a look at sass file located at /sass/styles.css
BEM (block, element, modifier) css methodology
Creation of grid system specific for this project (emulating bootstrap like frameworks for responsive layouts). The calculations are made thanks to sass
Responsive site for different screen sizes (Desktop, tablet, smartphone)
Automation of Sass compilations for css rendering using GulpJS and watchers.

01/03/2017

