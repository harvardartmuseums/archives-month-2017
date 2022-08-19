# :warning: ARCHIVED

The Lightbox program ended on July 31, 2022. All associated projects have been retired and are no longer supported.

# Archives Month 2017

This is the forthcoming Lightbox project for American Archive Month 2017, displaying materials on the history of Sardis. 

![America-Archives-Month-Sardis-2017](https://user-images.githubusercontent.com/3187493/185649452-eb58a177-ec71-4ec1-8e32-6ec3cf1a2baa.png)



Note that the framework, which uses d3 to display zoomable nodes controllable on an iPad, can be repurposed by changing the url in index.js to point to a new data.json file. The format for the JSON is 



{"title": "", "type": "", "content": "", "caption": "", "nodes": []}



where type is "image", "text", "audio", or "video", content is, respectively, the URL of an image, text, a list [] with the URL of an audio file and then the URL of an image, or the URL of a video, and nodes holds any children nodes, which follow the same format.



The project can be viewed at:

http://archives-month-2017.herokuapp.com/index.html

http://archives-month-2017.herokuapp.com/control.html

Screen recording:

https://user-images.githubusercontent.com/3187493/185650019-168f7c76-78fb-41ae-a9ac-9e8ddaea3a84.mp4


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
