
DIST=dist
JS=$(DIST)/flowplayer.thumbnails

GIT_ID=${shell git rev-parse --short HEAD }

min:
	@ mkdir -p $(DIST)
	@ sed -ne 's/\$$GIT_ID\$$/$(GIT_ID)/; /^\/\*!/,/^\*\// p' flowplayer.thumbnails.js > $(JS).min.js
	@ sed -e '/"use strict"/ d' flowplayer.thumbnails.js | npm run -s minify >> $(JS).min.js 2>/dev/null

all: min
	@ cp flowplayer.thumbnails.js $(JS).js

dist: clean all
	@ cp LICENSE.md $(DIST)/

zip: dist
	@ cd $(DIST) && zip flowplayer.thumbnails.zip *.js LICENSE.md

clean:
	@ rm -rf $(DIST)

lint:
	@ npm run -s lint

deps:
	@ npm install
