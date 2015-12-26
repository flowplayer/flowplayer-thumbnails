# flowplayer-thumbnails

Flowplayer thumbnail image plugin

## Usage

Live demo at http://demos.flowplayer.org/api/thumbnails.html

### Create thumbnails from video

Simple [ffmpeg](http://www.ffmpeg.org/) command example:

```
ffmpeg -i bauhaus.mp4 -r 1 -filter:v scale=-1:160 bauhaus%d.jpg
```

To cater for devices with retina display scale height should be 2 times the value of the desired
`height` [option](#options).

### Configuration

#### include assets

```html
<script src="//releases.flowplayer.org/6.0.4/flowplayer.min.js"></script>
<script src="//releases.flowplayer.org/thumbnails/flowplayer-thumbnails.min.js"></script>
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
