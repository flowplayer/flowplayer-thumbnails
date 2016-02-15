
DIST=dist
BASE=flowplayer.thumbnails

GIT_ID=${shell git rev-parse --short HEAD }

min:
	@ mkdir -p $(DIST)
	@ sed -e 's/\$$GIT_ID\$$/$(GIT_ID)/' $(BASE).js | npm run min

all: min
	@ sed -e 's/\$$GIT_ID\$$/$(GIT_ID)/' $(BASE).js > $(DIST)/$(BASE).js

dist: clean all
	@ cp LICENSE.md $(DIST)/

zip: dist
	@ cd $(DIST) && zip $(BASE).zip *.js LICENSE.md

clean:
	@ rm -rf $(DIST)

lint:
	@ npm run -s lint

deps:
	@ npm install
