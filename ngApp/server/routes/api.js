const express = require('express');
const router = express.Router();
const Video = require('../models/video');

router.get('/', (req, res) => {
  res.send('api works!!!!');
});

router.get('/videos', (req, res) => {
  console.log('get request for all videos');
  Video.find({}).exec(function(err, videos) {
    if (err) {
      console.log('error retrieving videos');
    } else {
      res.json(videos);
    }
  });
});

router.get('/videos/:id', (req, res) => {
  console.log('get request for all videos');
  Video.findById(req.params.id).exec(function(err, video) {
    if (err) {
      console.log('error retrieving videos');
    } else {
      res.json(video);
    }
  });
});

router.post('/video', (req, res) => {
  console.log('post a video');
  var newVideo = new Video();
  newVideo.title = req.body.title;
  newVideo.url = req.body.url;
  newVideo.description = req.body.description;
  newVideo.save(function(err, insertedVideo) {
    if (err) {
      console.log('error creating video');
    } else {
      res.json(insertedVideo);
    }
  });
});

router.put('/video/:id', (req, res) => {
  console.log('Update a video');
  Video.findByIdAndUpdate(req.params.id,
  {
    $set: { title: req.body.title, url: req.body.url, description: req.body.description }
  },
  {
    new: true
  },
  function(err, updatedVideo) {
    if (err) {
      res.send('error updating video')
    } else {
      res.json(updatedVideo);
    }
  }
);
});

router.delete('/video/:id', (req, res) => {
  console.log('deleting a video');
  Video.findByIdAndRemove(req.params.id, function(err, deletedVideo) {
    if (err) {
      res.send('error deleting video');
    } else {
      res.json(deletedVideo);
    }
  });
});

module.exports = router;
