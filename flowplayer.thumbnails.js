/*jslint browser: true, node: true */
/*global window */

/*!

   Thumbnail image plugin for Flowplayer HTML5

   Copyright (c) 2015-2016, Flowplayer Oy

   Released under the MIT License:
   http://www.opensource.org/licenses/mit-license.php

   requires:
   - Flowplayer HTML5 version 6.x or greater
   revision: $GIT_ID$

*/

(function (flowplayer) {
    "use strict";
    flowplayer(function (api, root) {
        var common = flowplayer.common,
            bean = flowplayer.bean,
            support = flowplayer.support,
            timeline = common.find('.fp-timeline', root)[0],
            timelineTooltip = common.find('.fp-timeline-tooltip', root)[0];

        if (support.touch || !support.inlineVideo) {
            return;
        }

        api.on('ready', function (ev, a, video) {
            // cleanup
            bean.off(root, '.thumbnails');
            common.css(timelineTooltip, {
                width: '',
                height: '',
                'background-image': '',
                'background-repeat': '',
                'background-size': '',
                'background-position': '',
                'border': '',
                'text-shadow': ''
            });

            var c = video.thumbnails || api.conf.thumbnails,
                preloadImages = function (tmpl, max, start) {
                    if (start === undefined) {
                        start = 1;
                    }
                    function load() {
                        if (start > max) {
                            return;
                        }
                        var img = new Image();
                        img.src = tmpl.replace('{time}', start);
                        img.onload = function () {
                            start += 1;
                            load();
                        };
                    }
                    load();
                };

            if (!c) {
                return;
            }
            if (c.preload !== false) {
                preloadImages(c.template, video.duration);
            }
            bean.on(root, 'mousemove.thumbnails', '.fp-timeline', function (ev) {
                var x = ev.pageX || ev.clientX,
                    delta = x - common.offset(timeline).left,
                    percentage = delta / common.width(timeline),
                    seconds = Math.round(percentage * api.video.duration);

                // 2nd condition safeguards at out of range retrieval attempts
                if (seconds < 0 || seconds > Math.round(api.video.duration)) {
                    return;
                }
                /* enables greater interval than one second between thumbnails */
                if (c.interval !== undefined && c.interval > 1 && seconds > 0) {
                    seconds = Math.ceil(seconds / c.interval) - 1;
                }
                var height = c.height || 80;
                common.css(timelineTooltip, {
                    width: (height / api.conf.ratio) + 'px',
                    height: height + 'px',
                    // {time} template expected to start at 1, video time/first frame starts at 0
                    'background-image': "url('" + c.template.replace('{time}', seconds + 1) + "')",
                    'background-repeat': 'no-repeat',
                    'background-size': 'cover',
                    'background-position': 'center',
                    'border': '1px solid #333',
                    'text-shadow': '1px 1px #000'
                });
            });
        });

    });

}((typeof module === "object" && module.exports)
    ? require('flowplayer')
    : window.flowplayer));
