APP=money-manager

dev:
	air

build-linux:
	go build -o build/$(APP).linux main.go
	cp build/$(APP).linux ../build

test:
	go test ./...

clean:
	rm -rf build tmp

deps:
	go mod tidy

doc:
	swag fmt