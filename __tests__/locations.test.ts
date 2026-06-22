import { describe, it, expect } from "vitest";
import { getLocation, getLocationFromPath } from "../src/data/locations";

describe("getLocation", () => {
  it("defaults to London", () => {
    expect(getLocation().slug).toBe("london");
    expect(getLocation().phoneDisplay).toBe("020 4628 3137");
  });

  it("returns Glasgow details", () => {
    const g = getLocation("glasgow");
    expect(g.phoneDisplay).toBe("0141 488 8985");
    expect(g.phoneHref).toBe("01414888985");
    expect(g.email).toBe("hello@harleystreetmedicalwellness.co.uk");
    expect(g.clinics).toHaveLength(1);
    expect(g.clinics[0].lines.join(" ")).toContain("227 Ingram St");
    expect(g.schemaAddress.postalCode).toBe("G1 1DA");
    expect(g.pathPrefix).toBe("/glasgow");
    expect(g.webhookPrefix).toBe("glasgow-");
  });

  it("keeps London with two clinics and original domain", () => {
    const l = getLocation("london");
    expect(l.clinics).toHaveLength(2);
    expect(l.baseUrl).toBe("https://harleystreetwellness.co.uk");
  });
});

describe("getLocationFromPath", () => {
  it("detects Glasgow from /glasgow paths", () => {
    expect(getLocationFromPath("/glasgow/knee-pain").slug).toBe("glasgow");
    expect(getLocationFromPath("/glasgow").slug).toBe("glasgow");
  });
  it("defaults to London otherwise", () => {
    expect(getLocationFromPath("/knee-pain").slug).toBe("london");
    expect(getLocationFromPath(null).slug).toBe("london");
  });
});
