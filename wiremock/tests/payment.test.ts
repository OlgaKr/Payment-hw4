describe("WireMock payment tests", () => {
  test("Successful payment", async () => {
    const response = await fetch("http://localhost:8080/v1/payment_intents", {
      method: "POST",
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toHaveProperty("id");
    expect(body.status).toBe("requires_capture");
  });

  test("Card declined", async () => {
    const response = await fetch(
      "http://localhost:8080/v1/payment_intents/declined",
      {
        method: "POST",
      },
    );

    const body = await response.json();

    expect(response.status).toBe(402);
    expect(body.error.decline_code).toBe("insufficient_funds");
  });

  test("Request timeout", async () => {
    await expect(
      fetch("http://localhost:8080/v1/payment_intents/timeout", {
        method: "POST",
        signal: AbortSignal.timeout(2000),
      }),
    ).rejects.toThrow();
  });

  test("Server error", async () => {
    const response = await fetch(
      "http://localhost:8080/v1/payment_intents/error",
      {
        method: "POST",
      },
    );

    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error.type).toBe("api_error");
    expect(body.error.message).toBe("Service unavailable");
  });
});
