php_container := php
docker := docker-compose
compose := $(docker) --file docker-compose.yml
docker_exec := $(compose) exec
args = $(filter-out $@,$(MAKECMDGOALS))

build:
	$(docker) build --no-cache
.PHONY: build

rebuild: build
	$(docker) up -d
.PHONY: rebuild

enter:
	$(docker) exec $(php_container) sh
.PHONY: enter

test:
	$(docker_exec) $(php_container) ./vendor/bin/phpunit
.PHONY: test

test-filter:
	$(docker_exec) $(php_container) ./vendor/bin/phpunit --filter $(args)
.PHONY: test-filter

erase: ## erase containers with related volumes
	$(compose) down -v
.PHONY: erase

