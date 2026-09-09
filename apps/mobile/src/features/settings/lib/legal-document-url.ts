const BACKPLANE_LICENSE_URL = "https://github.com/i2cjak/Backplane/blob/t3cad/LICENSE";
const BACKPLANE_SECURITY_URL = "https://github.com/i2cjak/Backplane/security/policy";

const DEFAULT_LEGAL_DOCUMENT_URLS = {
  privacy: BACKPLANE_SECURITY_URL,
  security: BACKPLANE_SECURITY_URL,
  terms: BACKPLANE_LICENSE_URL,
  legal: BACKPLANE_LICENSE_URL,
} as const;

function resolveMarketingSiteUrl(override: string | undefined): URL {
  try {
    const url = new URL(override?.trim() || BACKPLANE_LICENSE_URL);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return new URL(BACKPLANE_LICENSE_URL);
    }

    url.search = "";
    url.hash = "";
    url.pathname = `${url.pathname.replace(/\/+$/, "")}/`;
    return url;
  } catch {
    return new URL(BACKPLANE_LICENSE_URL);
  }
}

const configuredMarketingSiteUrl = process.env.EXPO_PUBLIC_MARKETING_SITE_URL?.trim();
const MARKETING_SITE_URL = configuredMarketingSiteUrl
  ? resolveMarketingSiteUrl(configuredMarketingSiteUrl)
  : null;

function marketingSiteDocumentUrl(path: string): string {
  if (MARKETING_SITE_URL === null) {
    const key =
      path === "privacy-policy"
        ? "privacy"
        : path === "security-policy"
          ? "security"
          : path === "terms-of-service"
            ? "terms"
            : "legal";
    return DEFAULT_LEGAL_DOCUMENT_URLS[key];
  }
  return new URL(path, MARKETING_SITE_URL).toString();
}

export const PRIVACY_POLICY_URL = marketingSiteDocumentUrl("privacy-policy");
export const SECURITY_POLICY_URL = marketingSiteDocumentUrl("security-policy");
export const TERMS_OF_SERVICE_URL = marketingSiteDocumentUrl("terms-of-service");
export const LEGAL_URL = marketingSiteDocumentUrl("legal");

export const ALLOWED_LEGAL_DOCUMENT_URLS = [
  LEGAL_URL,
  PRIVACY_POLICY_URL,
  TERMS_OF_SERVICE_URL,
  SECURITY_POLICY_URL,
] as const;

function webDocumentIdentity(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;

    const pathname = url.pathname.replace(/\/+$/, "") || "/";
    return `${url.origin}${pathname}`;
  } catch {
    return null;
  }
}

const ALLOWED_LEGAL_DOCUMENT_IDENTITIES = new Set(
  ALLOWED_LEGAL_DOCUMENT_URLS.map(webDocumentIdentity).filter(
    (value): value is string => value !== null,
  ),
);

export function isLegalDocumentUrl(value: string): boolean {
  const identity = webDocumentIdentity(value);
  return identity !== null && ALLOWED_LEGAL_DOCUMENT_IDENTITIES.has(identity);
}
