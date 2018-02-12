.PHONY: up

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
