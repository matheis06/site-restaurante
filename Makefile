PORT ?= 4173

.PHONY: preview
preview:
	@echo "Iniciando preview em http://localhost:$(PORT)/index.html"
	@python3 -m http.server $(PORT)
