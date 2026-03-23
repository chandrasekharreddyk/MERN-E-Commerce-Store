import { describe, it, expect } from "vitest";

describe("basic frontend test", () => {
  it("title contains MERN", () => {
    const title = "MERN E-Commerce Store";
    expect(title).toContain("Chandu");
  });
});