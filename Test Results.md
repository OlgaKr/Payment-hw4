## Test Results

| Test               | Endpoint                            | Expected Result                                                                                   | Actual Result                                                                                           | Status |
| ------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------ |
| Successful payment | `POST /v1/payment_intents`          | HTTP 200. Response contains an `id` and `status` equals `requires_capture`.                       | HTTP 200 received. Response contained `id: pi_mock_001` and `status: requires_capture`.                 | PASS   |
| Card declined      | `POST /v1/payment_intents/declined` | HTTP 402. Response contains `error.decline_code` with value `insufficient_funds`.                 | HTTP 402 received. `error.decline_code` was `insufficient_funds`.                                       | PASS   |
| Request timeout    | `POST /v1/payment_intents/timeout`  | The HTTP client times out after 2 seconds because the WireMock response is delayed by 10 seconds. | The request timed out as expected after approximately 2 seconds.                                        | PASS   |
| Server error       | `POST /v1/payment_intents/error`    | HTTP 503. Response contains `error.type: api_error` and `error.message: Service unavailable`.     | HTTP 503 received. Response contained `error.type: api_error` and `error.message: Service unavailable`. | PASS   |

Full Jest execution output is available in `test-execution.log`.
