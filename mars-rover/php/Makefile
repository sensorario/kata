php_container := php
docker := docker-compose
compose := $(docker) --file docker-compose.yml
docker_exec := $(compose) exec
args = $(filter-out $@,$(MAKECMDGOALS))
tester = ./vendor/bin/phpunit

build:
	$(docker) build --no-cache
.PHONY: build

rebuild: build
	$(docker) up -d
.PHONY: rebuild

enter:
	$(docker) --workdir /app exec  $(php_container) sh
.PHONY: enter

test:
	$(docker_exec) --workdir /app $(php_container) $(tester)
.PHONY: test

test-filter:
	$(docker_exec) --workdir /app $(php_container) $(tester) --filter $(args)
.PHONY: test-filter

erase: ## erase containers with related volumes
	$(compose) down -v
.PHONY: erase

