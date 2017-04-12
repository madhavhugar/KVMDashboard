# KVM Dashboard

* Dashboard application to display live information on the Virtual machines running on the servers
* Use commands 
	* **pm2 show server** to see stats on the running web application
	* **pm2 start server** to start the web application
	* **pm2 stop server** to stop the web application
	* Refer http://pm2.keymetrics.io/docs/usage/quick-start/ for more commands and pm2 features

## Technologies Used

* AngularJS
* NodeJS
* Angular UI-Router

## Folder Structure

* / - node script for Backend(server.js)
* modules - The shell scripts that run in the background to fetch the server or virtual machine details
* public - HTML page and templates
* public/js - Angular Controller for frontend

## Other packages

* Used pm2 node module as a production process manager
