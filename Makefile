
.PHONY: all publish

all: publish

publish:
	@echo "Publishing normal configuration for site-bkgs"
	tsc

clean:
	@echo "Cleaning up site-bkgs"
	rm -rf bin/
