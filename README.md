# Flowplayer thumbnails plugin

This plugin displays preview thumbnail images on the timeline.

## Usage

Live demo at http://demos.flowplayer.org/api/thumbnails.html

### Create thumbnails from video

Simple [ffmpeg](http://www.ffmpeg.org/) command example:

```
$ ffmpeg -i bauhaus.mp4 -r 1 -filter:v scale=-1:160 bauhaus%d.jpg
```

To cater for devices with retina display scale height should be 2 times the value of the desired
`height` [option](#options).

Especially for longer videos it is recommended to save as much on image file size as possible to
save on loading time.

Example command to batch create and optimize thumbnail images:

```
$ ffmpeg -i bauhaus.mp4 -r 1 -filter:v scale=-1:160 -q:v 5 %d-X.jpg
$ for j in *-X.jpg; do jpegtran -copy none -optimize -outfile ${j%-X.jpg}.jpg; done
$ rm *-X.jpg
```

### Configuration

#### include assets

```html
<script src="//releases.flowplayer.org/6.0.4/flowplayer.min.js"></script>
<script src="//releases.flowplayer.org/thumbnails/flowplayer.thumbnails.min.js"></script>
```

#### initialize player

```js
flowplayer('#player', {
  ratio: 0.4167,
  clip: {
    title: 'Bauhaus',
    thumbnails: {
      template: 'thumbnails/bauhaus{time}.jpg'
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

## Options

Options can be set either on `clip` or on the top level of flowplayer configuration with the key `thumbnails`.

There's an example in the `example/` directory.

option     | required | default value | description
:----------| ---------| :------------ | :----------
`template` | yes      |               | The path from where to load the thumbnail images. Either a relative or absolute path. Use `{time}` as a placeholder for seconds.
`preload`  | no       |`true`         | If `true`, then all images will be cached at player initialization to make them appear quicker.
`height`   | no       | 80            | The thumbnail height.

## CommonJS

The plugin can be used in a [browserify](http://browserify.org) and/or
[webpack](https://webpack.github.io/) environment with a
[commonjs](http://requirejs.org/docs/commonjs.html) loader:

```js
var flowplayer = require('flowplayer');
require('flowplayer-thumbnails'); // Plugin injects itself into flowplayer
```

## Building the plugin

Build requirement:

- [nodejs](https://nodejs.org) with [npm](https://www.npmjs.com)

```sh
cd flowplayer-thumbnails
make deps
make
```
