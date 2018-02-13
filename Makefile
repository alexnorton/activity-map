.PHONY: up install-client install-server install build-client

up:
	docker-compose -f docker/docker-compose.yml up

install-client:
	docker-compose -f docker/docker-compose.yml run \
		--no-deps \
		--rm \
		client \
		yarn

install-server:
	docker-compose -f docker/docker-compose.yml run \
		--no-deps \
		--rm \
		server \
		yarn

install: install-client install-server

build-client:
	docker-compose -f docker/docker-compose.yml run \
		--no-deps \
		--rm \
		client \
		yarn run build
