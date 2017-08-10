# Archives Month 2017

This is the forthcoming Lightbox project for American Archive Month 2017, displaying materials on the history of Sardis. 


Note that the framework, which uses d3 to display zoomable nodes controllable on an iPad, can be repurposed by changing the url in index.js to point to a new data.json file. The format for the JSON is 


{"title": "", "type": "", "content": "", "caption": "", "nodes": []}


where type is "image", "text", "audio", or "video", content is, respectively, the URL of an image, text, a list [] with the URL of an audio file and then the URL of an image, or the URL of a video, and nodes holds any children nodes, which follow the same format.


The project can be viewed at:

http://archives-month-2017.herokuapp.com/index.html

http://archives-month-2017.herokuapp.com/control.html

## Requirements

* NodeJS

### Installation
```
npm install 
```

### Start the server
```
npm start
```
