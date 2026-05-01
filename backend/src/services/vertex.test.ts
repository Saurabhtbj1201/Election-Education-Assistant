import { describe, expect, it, vi } from "vitest";

describe("askGroundedQuestion", () => {
  it("falls back cleanly when Gemini is not configured", async () => {
    vi.resetModules();
    vi.stubEnv("GEMINI_API_KEY", "");

    const { askGroundedQuestion } = await import("./vertex.js");
    const result = await askGroundedQuestion("What should I do before polling day?", "Goa");

    expect(result.answer).toContain("non-partisan overview");
    expect(result.confidence).toBe("medium");
    expect(result.fallback).toBe(false);
    expect(result.citations.length).toBeGreaterThan(0);
  });
});