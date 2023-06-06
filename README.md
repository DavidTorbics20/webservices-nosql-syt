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


In case the html or the css from the website is missing make sure that "Quirks Mode" is deactivated. For that type `<!Doctype html>` at the beginning of the html file.

### **Connecting to MongoDB**

When starting MongoDB with `docker-compose up` it may accour that you will get this error `Error: connect ECONNREFUSED 127.0.0.1:27017`. This means that you need to start mongod. In order to do that you first
