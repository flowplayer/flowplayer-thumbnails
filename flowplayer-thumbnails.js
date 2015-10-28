/* jshint undef:true, browser:true, node:true */

(function(flowplayer) {
  "use strict";
  flowplayer(function(api, root) {
    var common = flowplayer.common,
        bean = flowplayer.bean,
        timeline = common.find('.fp-timeline', root)[0],
        timelineTooltip = common.find('.fp-timeline-tooltip', root)[0];

    api.on('ready', function(ev, a, video) {
      cleanup();
      var c = video.thumbnails || api.conf.thumbnails;
      if (!c) return;
      if (c.preload !== false) {
        preloadImages(c.template, video.duration);
      }
      bean.on(root, 'mousemove.thumbnails', '.fp-timeline', function(ev) {
        var x = ev.pageX || ev.clientX,
            delta = x - common.offset(timeline).left,
            percentage = delta / common.width(timeline),
            seconds = Math.round(percentage * api.video.duration);
        if (seconds < 1) return;
        var height = c.height || 80;
        common.css(timelineTooltip, {
          width: (height / api.conf.ratio) + 'px',
          height: height + 'px',
          'background-image': "url('" + c.template.replace('{time}', seconds) + "')",
          'background-repeat': 'no-repeat',
          'background-size': 'cover',
          'background-position': 'center'
        });
      });
    });
    function cleanup() {
      bean.off(root, '.thumbnails');
      common.css(timelineTooltip, {
        width: '',
        'padding-bottom': '',
        'background-image': '',
        'background-repeat': '',
        'background-size': '',
        'background-position': ''
      });
    }

  });

  function preloadImages(tmpl, max, start) {
    if (typeof start === 'undefined') start = 1;
    function load() {
      if (start > max) return;
      var img = new Image();
      img.src = tmpl.replace('{time}', start);
      img.onload = function() {
        start++;
        load();
      };
    }
    load();
  }
}(typeof module === "object" && module.exports ? require('flowplayer') : window.flowplayer));
