# Payment HW4 — WireMock

Homework #4: payment API mocking with WireMock, Jest, and TypeScript.

## Test scenarios

- Successful payment
- Card declined
- Request timeout
- Server error (HTTP 503)

## Run WireMock

```bash
docker run -d --name wiremock -p 8080:8080 -v "${PWD}/wiremock/stubs:/home/wiremock/mappings" wiremock/wiremock:3.3.1
```
