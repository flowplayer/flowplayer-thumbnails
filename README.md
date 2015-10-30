# flowplayer-thumbnails
Flowplayer thumbnail image plugin

## Usage

Live demo at http://cdn.rawgit.com/nnarhinen/flowplayer-thumbnails/master/example/index.html

### Create thumbnails from video

```
ffmpeg -i bauhaus.mp4 -filter:v scale=-1:160,fps=1 bauhaus%d.jpg
```

### Configuration

#### include assets

```html
<script src="//releases.flowplayer.org/6.0.3/flowplayer.min.js"></script>
<script src="flowplayer-thumbnails.js"></script>
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
`height`   | no       | 80            | The thumbnail height


## CORS

If the player is offered for [embedding](https://flowplayer.org/docs/embedding.html) or if the images are not served from the same domain, they must be loaded from a server with a [cross domain policy](https://flowplayer.org/docs/setup.html#cross-domain) permitting `GET` requests.
