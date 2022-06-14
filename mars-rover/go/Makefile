files := main.go 

test:
	go test ./... -v
.PHONY: test

cover:
	# go env -w GO111MODULE=off
	go test ./... -v -coverprofile cover.html
	go tool cover -html=cover.html
.PHONY: cover

run:
	go run $(files) 
.PHONY: run
