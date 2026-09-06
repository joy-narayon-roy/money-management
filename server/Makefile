APP=money-manager

dev:
	air

build-linux:
	go build -o build/$(APP).linux main.go
	cp build/$(APP).linux ../build/$(APP).linux

build-rp:
	CGO_ENABLED=0 GOOS=linux GOARCH=arm GOARM=7 go build -ldflags="-s -w" -o build/$(APP).ras_pi
	cp build/$(APP).ras_pi ../build/$(APP).ras_pi

test:
	go test ./...

clean:
	rm -rf build tmp

deps:
	go mod tidy

doc:
	swag fmt