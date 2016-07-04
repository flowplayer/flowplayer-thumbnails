# Flowplayer thumbnails plugin

This plugin displays preview thumbnail images on the timeline.

## Usage

See: https://flowplayer.org/docs/plugins.html#thumbnails

- [loading the assets](https://flowplayer.org/docs/plugins.html#thumbnails-assets)
- [generating thumbnails](https://flowplayer.org/docs/plugins.html#generating-thumbnails)
- [configuration](https://flowplayer.org/docs/plugins.html#thumbnails-configuration)


### Initialize player

```js
flowplayer('#player', {
  ratio: 0.4167,
  clip: {
    title: 'Bauhaus',
    thumbnails: {
      template: 'thumbnails/bauhaus{time}.jpg',
      time_format: function (t) {
        // An example using left padding.
        var padding = "0000";
        var formatted_time = padding.substring(0, padding.length - t.toString().length) + t;
        return formatted_time + "-thumb.jpg";
      }
    },
    sources: [{
      type: 'video/webm',
      src: '//stream.flowplayer.org/bauhaus.webm'
    }, {
      type: 'video/mp4',
      src: '//stream.flowplayer.org/bauhaus.mp4'
    }]
  }
});
```

## Demo

http://demos.flowplayer.org/api/thumbnails.html

## CommonJS

The plugin can be used in a [browserify](http://browserify.org) and/or
[webpack](https://webpack.github.io/) environment with a
[commonjs](http://requirejs.org/docs/commonjs.html) loader:

```js
var flowplayer = require('flowplayer'),
    plugin = require('flowplayer-thumbnails');

plugin(flowplayer); // plugin injects itself into Flowplayer
```

## Building the plugin

Build requirement:

- [nodejs](https://nodejs.org) with [npm](https://www.npmjs.com)

```sh
cd flowplayer-thumbnails
make deps
make
```
