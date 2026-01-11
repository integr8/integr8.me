.PHONY: help setup install dev build preview lint format typecheck clean deploy test

# Variáveis
SHELL := /bin/bash
NODE_ENV ?= development
MISE := mise exec --

# Default target
.DEFAULT_GOAL := help

help:
	@echo "🚀 Integr8 Website - Available Commands"
	@echo ""
	@echo "Setup:"
	@echo "  make setup              Setup mise and install dependencies"
	@echo "  make install            Install dependencies"
	@echo "  make precommit-install  Install pre-commit hooks"
	@echo "  make precommit-run      Run pre-commit on all files"
	@echo "  make precommit-update   Update pre-commit hooks"
	@echo "  make clean              Clean build artifacts"
	@echo ""
	@echo "Development:"
	@echo "  make dev                Start development server (localhost:3000)"
	@echo "  make build              Build for production"
	@echo "  make preview            Preview production build"
	@echo ""
	@echo "Quality:"
	@echo "  make lint               Run ESLint"
	@echo "  make lint-fix           Fix linting issues"
	@echo "  make format             Run Prettier"
	@echo "  make format-check       Check formatting"
	@echo "  make typecheck          TypeScript type checking"
	@echo ""
	@echo "Content:"
	@echo "  make add-solution       Add new solution template"
	@echo "  make add-case           Add new case study template"
	@echo "  make add-post           Add new blog post template"
	@echo ""
	@echo "Deployment:"
	@echo "  make deploy             Build and prepare for deployment"
	@echo ""

setup:
	@echo "🔧 Setting up mise environment..."
	@which mise > /dev/null || (echo "❌ mise not installed. Install from: https://mise.jdx.dev" && exit 1)
	@mise trust
	@mise install
	@echo "✅ mise setup complete!"
	@$(MAKE) install
	@$(MAKE) precommit-install

install:
	@echo "📦 Installing dependencies..."
	$(MISE) pnpm install

precommit-install:
	@echo "🪝 Installing pre-commit hooks..."
	$(MISE) pre-commit install
	$(MISE) pre-commit install --hook-type commit-msg
	@echo "✅ pre-commit hooks installed!"

precommit-run:
	@echo "🪝 Running pre-commit on all files..."
	$(MISE) pre-commit run --all-files

precommit-update:
	@echo "🪝 Updating pre-commit hooks..."
	$(MISE) pre-commit autoupdate

dev:
	@echo "🚀 Starting development server..."
	$(MISE) pnpm dev

build:
	@echo "🔨 Building for production..."
	$(MISE) pnpm build

preview:
	@echo "👀 Previewing production build..."
	$(MISE) pnpm preview

lint:
	@echo "🔍 Running ESLint..."
	$(MISE) pnpm lint

lint-fix:
	@echo "✨ Fixing linting issues..."
	$(MISE) pnpm lint:fix

format:
	@echo "💅 Running Prettier..."
	$(MISE) pnpm format

format-check:
	@echo "📋 Checking formatting..."
	$(MISE) pnpm format:check

typecheck:
	@echo "🔐 Type checking with TypeScript..."
	$(MISE) pnpm typecheck

clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf dist
	rm -rf node_modules/.astro
	rm -rf .astro

deploy: lint typecheck build
	@echo "✅ Ready for deployment!"
	@echo "Build artifacts in: ./dist"

test: lint typecheck
	@echo "✅ All checks passed!"

# Content templates
add-solution:
	@echo "📝 Creating new solution template..."
	@read -p "Solution name: " name; \
	slug=$$(echo $$name | tr ' ' '-' | tr '[:upper:]' '[:lower:]'); \
	filename="src/content/solutions/ptbr/$${slug}.md"; \
	touch "$$filename"; \
	echo "✅ Created: $$filename"

add-case:
	@echo "📝 Creating new case study template..."
	@read -p "Case name: " name; \
	slug=$$(echo $$name | tr ' ' '-' | tr '[:upper:]' '[:lower:]'); \
	filename="src/content/cases/ptbr/$${slug}.md"; \
	touch "$$filename"; \
	echo "✅ Created: $$filename"

add-post:
	@echo "📝 Creating new blog post template..."
	@read -p "Post title: " title; \
	slug=$$(echo $$title | tr ' ' '-' | tr '[:upper:]' '[:lower:]'); \
	date=$$(date +%Y-%m-%d); \
	filename="src/content/blog/ptbr/$${slug}.md"; \
	echo "+++" > "$$filename"; \
	echo "title = \"$$title\"" >> "$$filename"; \
	echo "slug = \"$$slug\"" >> "$$filename"; \
	echo "date = $$date" >> "$$filename"; \
	echo "author = \"Integr8\"" >> "$$filename"; \
	echo "description = \"Descrição do post\"" >> "$$filename"; \
	echo "category = \"devops\"" >> "$$filename"; \
	echo "tags = [\"tag1\", \"tag2\"]" >> "$$filename"; \
	echo "+++" >> "$$filename"; \
	echo "" >> "$$filename"; \
	echo "## Introdução" >> "$$filename"; \
	echo "" >> "$$filename"; \
	echo "Seu conteúdo aqui..." >> "$$filename"; \
	echo "" >> "$$filename"; \
	echo "## Conclusão" >> "$$filename"; \
	echo "" >> "$$filename"; \
	echo "Conclusão do post..." >> "$$filename"; \
	echo "✅ Created: $$filename"

# Docker helpers (se docker disponível)
docker-build:
	@echo "🐳 Building Docker image..."
	docker build -t integr8-website .

docker-run:
	@echo "🐳 Running Docker container..."
	docker run -p 3000:3000 integr8-website

# Git helpers
git-status:
	git status

git-diff:
	git diff

# Performance check
lighthouse:
	@echo "⚡ Running Lighthouse checks..."
	@which lighthouse > /dev/null || npm install -g @lhci/cli@latest
	lhci autorun

# Development utilities
watch-css:
	@echo "👀 Watching CSS for changes..."
	$(MISE) pnpm build:css --watch

watch-types:
	@echo "👀 Watching types..."
	$(MISE) pnpm typecheck --watch

# Dependencies
update-deps:
	@echo "📦 Updating dependencies..."
	$(MISE) pnpm update

audit:
	@echo "🔒 Auditing dependencies..."
	$(MISE) pnpm audit

# Size analysis
bundle-analyze:
	@echo "📊 Analyzing bundle size..."
	@echo "Build and analyze with: $(MISE) pnpm build && npm install -g serve && serve dist"

# Documentation
docs:
	@echo "📚 Generated documentation:"
	@echo "  - README.md: Main documentation"
	@echo "  - CONTRIBUTING.md: Contribution guidelines"
	@echo "  - .env.example: Environment variables"

