# **webservices-nosql-syt**

## **Documentation**

The actual documentation is to be found in OneNote. This is a guide on how to setup and start the Node.js application.

## **Setup**

The running of the project **requires Node.js.**

### **Running locally**

`Btw it´s better to run it on docker`

First locate the 'index.js' file. The default location of the index.js file is `./src/index.js`. In case it is inside another folder navigate there with
After arriving at the right location run:

```
npm i
node index.js
```

You will find the website if you search 'http://localhost:3000/'

### **Running on Docker**

Go into ./src/ and run:

```
docker-compose build
docker-compose up
```

We highly recomend running it as a docker and not locally.

### **File structure**

The files should be sorted in the following way:

```
└───src
    ├───models
    │   ├─── person.js
    ├───node_modules
    │   ├─── auto generated files
    │   ├─── ...
    ├───routes
    │   ├─── person.js
    ├─── index.js
    └───website
        ├───css
        │   ├─── all css related files
        ├───html
        │   ├─── all html related files
        ├───images
        │   ├─── all image files
        │───js
        │   ├─── all js related files
```

In case the html or the css from the website is missing make sure that "Quirks Mode" is deactivated. For that don't forget to type ```<!Doctype html>``` at the beginning of the html file.

### **How to use** 

After you have started the application locally or on a docker connect to it with ```localhost:3000```. Nwo you will hopefully see the example page. 

First, insert some values into the corresponding input fields. After you have done that press the ```POST``` button to push the values onto the database. If you got some values wrong, for example the age, it won't be pushed to the database. After every successful action the whole content of the database is printed. 

Now you've got several options. the ```GET ALL``` button return all the saved data in the database, nothing else. 

If you enter an ID into the ID entry then the next three options will be available. By pressing ```GET by ID``` the person with this specific ID. 

When an existing ID is in the ID field and ```DELETE``` is pressed the person with this specific ID will be removed from the database. 

If you are not satisfied with something and want to change a value just enter the ID of the targeted person and enter the new values into the first name, last namd and age input field. After pressing ```PATCH``` the changes will be applied and changed in the database.

For any action that could not resurt in a valid output a text will appear on screen telling you that you did something wrong. If that happens go over the steps above and make sure that you did everything correctly.
