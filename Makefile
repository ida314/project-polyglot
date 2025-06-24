# Makefile ────── run `make <target>`
# --------------------------------------------------
COMPOSE ?= docker compose          # Fallback to `docker-compose` if you’re on v1
PROJECT ?= fullstack-dev           # Used only for logs banner

# Always rebuild images, start detached, and recreate changed containers
STACK_FLAGS := up -d --build --remove-orphans

.PHONY: stack-up stack-down stack-restart stack-build logs ps prune

## Start (rebuild if needed) backend + frontend
stack-up:
	@echo "Building & starting $(PROJECT)…"
	$(COMPOSE) $(STACK_FLAGS)
	@echo "\n stack is ready → http://localhost:3000"

## Stop and delete containers/networks (keeps volumes/images)
stack-down:
	$(COMPOSE) down --remove-orphans

## Rebuild everything from scratch
stack-build:
	$(COMPOSE) build --no-cache

## Restart the whole stack
stack-restart: stack-down stack-up

## Follow logs from all services
logs:
	$(COMPOSE) logs -f

## Show running containers
ps:
	$(COMPOSE) ps

## Clean dangling images/volumes (safe-ish prune)
prune:
	$(COMPOSE) down --remove-orphans --volumes
	docker system prune -f
