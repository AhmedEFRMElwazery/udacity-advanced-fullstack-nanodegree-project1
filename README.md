# udacity-advanced-fullstack-nanodegree-project1 (API for Image Processing)


[![Udacity's Logo](./assets/docs/udacityLogo.svg "Udacity's Logo")](https://www.udacity.com/)



## sponsored and funded by [egFWD](https://egfwd.com/) 

[![egFWD - Future of Work is Digital](./assets/docs/Egypt_fwd_logo-1.png "egFWD - Future of Work is Digital")](https://egfwd.com/)



*author*: **Ahmed E. F. R. Mohammed**


* [Package.json-scripts](#Package.json-scripts)
* [Proper-use](#Proper-use)
* [Endpoint](#Endpoint)
* [Notice](#Notice)


## Package.json-scripts
- ```npm install```: This is the first script to run in order to install all the dependencies and devDependencies needed for the project to function properly. 
- ```npm run prettier```: To apply the prettier rules to the code base, in order to ensure consistency for how the code is displayed.

- ```npm run eslint```: This "eslint" command will help you to write proper TypeScript code, but ensuring that there is no implict typing throughout the codebase.

- ```npm run build```: Once you're done coding your project in TypeScript, it is now the time to convert it to commonjs.

- ```npm run jasmine```: will condict unit testing using the jasmine testing framework. The testing result will be displayed in the console.

- ```npm run test```: will run the aforementioned "build" and "jasmine" commands consecutively.

- ```npm run start```: will start the development server using nodemon.

## Proper-use
Once your start the server, it will be listening on port 1987. Once you visit the 'http://localhost:1987/', you will be greeting with a landing page that serves as a guideline on how to use the API and its features, as demonstrated below:

![Landing Page](./assets/docs/API-landingPage.png "The Image Processing API landing page")



## Endpoint
http://localhost:1987/api/v1/processimage

In order for the API to function properly, three query parameters are needed:
- _imageName_: Available filenames are:
  - These could be one of the image names located in the `assets/images/full`, such as:
    - encenadaport
    - fjord
    - icelandwaterfall
    - palmtunnel
    - santamonica
  - Or you can use the keyword "all", and in this case, all the images located in the `assets/images/full` will be processed at once.   
- _desiredWidth_: A positive number of pixels that you wish to have for the image width.
- _desiredHeight_: A positive number of pixels that you wish to have for the image height.

Here are a few examples of properly formatted URLs:

http://localhost:1987/api/v1/processimage?imageName=fjord&desiredWidth=900&desiredHeight=700

This will result in creating a resized image of the "fjor" image located in the `assets/images/full`, with a 900 pixels width and 700 pixels height. The processed image will be saved in the `assets/images/thumb`.

http://localhost:1987/api/v1/processimage?imageName=all&desiredWidth=600&desiredHeight=900

In this case, the user have used the keyword `all` as entry for the `imageName` parameter. This will result in processing all the images located in the `assets/images/full` to be 600 pixels wide and 900 pixels height. They will all be saved to the `assets/images/thumb`


## Notice
- Once the server starts running, and a call is made to the API using the proper formatting, as stated abovem, a logger file titled `loggerFile.txt` will be created under `assets/`, and will remain there even after the server is down. This file is designed to persist on desk for the lifetime of the API to continually store details of the functioning as well as usage of the API. If deleted by any change, once the server received a new API call, it will be re-created again. The previously stored data is gone nontheless, and this newly created logger fille will serve as a fresh start.

- If by any chance, you end up deleting either the `full` or `thumb` folder, you will need to recreate them manually. the same applies to the parent folder of `images` and `assets` respectively. Otherwise, the API will NOT function properly and breaks down. **This functionality is intential**, to make sure that the user understands where to put the (original) photos on which he wants to conduct the resizing, and where he will get the new (processed) ones after conducting the processing operation on them. 

- I have added a `.gitkeep` file to the `assets/images/thumb` in order to allow github to see it and upload it...The `.gitkeep` file serves no other purpose, but to make the folder visible to github and successfully upload it, so the project starts working without any issues that could arise from the abscence of the `thumb` folder.


