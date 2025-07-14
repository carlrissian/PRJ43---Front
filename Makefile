
.PHONY: help build up down restart logs shell clean prune test lint install npm-add npm-remove

# Variables
CONTAINER_NAME = prj043-finance-front_app
DOCKER_COMPOSE = docker-compose

help: ## Muestra esta ayuda
	@echo "Comandos disponibles:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## Construye los contenedores
	$(DOCKER_COMPOSE) build --no-cache

up: ## Inicia los contenedores
	$(DOCKER_COMPOSE) up -d

down: ## Detiene y elimina los contenedores
	$(DOCKER_COMPOSE) down

restart: down up ## Reinicia los contenedores

logs: ## Muestra los logs en tiempo real
	$(DOCKER_COMPOSE) logs -f

shell: ## Abre una terminal en el contenedor
	$(DOCKER_COMPOSE) exec app sh

clean: ## Limpia contenedores, imágenes y volúmenes no utilizados
	docker system prune -f

prune: ## Limpia todo, incluyendo volúmenes y caché
	docker system prune -a --volumes

ensure-running: ## Asegura que el contenedor está corriendo
	@if [ -z "$$(docker-compose ps -q app 2>/dev/null)" ]; then \
		echo "Iniciando contenedores..."; \
		$(DOCKER_COMPOSE) up -d; \
		sleep 5; \
	fi

install: ensure-running ## Instala las dependencias del proyecto
	$(DOCKER_COMPOSE) exec app npm install

lint: ensure-running ## Ejecuta el linter
	$(DOCKER_COMPOSE) exec app npm run lint

test: ensure-running ## Ejecuta los tests
	$(DOCKER_COMPOSE) exec app npm run test

dev: up logs ## Inicia el entorno de desarrollo y muestra los logs

stop: ## Detiene los contenedores sin eliminarlos
	$(DOCKER_COMPOSE) stop

start: ## Inicia los contenedores existentes
	$(DOCKER_COMPOSE) start

status: ## Muestra el estado de los contenedores
	$(DOCKER_COMPOSE) ps

rebuild: down build up ## Reconstruye y reinicia los contenedores

npm-add: ensure-running ## Instala un nuevo paquete npm (uso: make npm-add p="nombre-paquete")
	$(DOCKER_COMPOSE) exec app npm install $(p)
