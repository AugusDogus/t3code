import { describe, expect, it } from "vite-plus/test";

import { isLegalDocumentUrl } from "./legal-document-url";

describe("isLegalDocumentUrl", () => {
  it.each([
    "https://github.com/i2cjak/Backplane/blob/t3cad/LICENSE",
    "https://github.com/i2cjak/Backplane/blob/t3cad/LICENSE#updates",
    "https://github.com/i2cjak/Backplane/security/policy?source=app",
    "https://github.com/i2cjak/Backplane/security/policy",
  ])("allows a configured legal document: %s", (url) => {
    expect(isLegalDocumentUrl(url)).toBe(true);
  });

  it.each([
    "https://github.com/i2cjak/Backplane/releases",
    "https://example.com/legal",
    "javascript:alert(1)",
    "not-a-url",
  ])("rejects a URL outside the legal-document allowlist: %s", (url) => {
    expect(isLegalDocumentUrl(url)).toBe(false);
  });
});
