import { XeroAccessToken, XeroIdToken } from "xero-node";

// TokenSet type for openid-client 6.x (returns plain objects instead of class)
export type TokenSet = {
  access_token?: string;
  token_type?: string;
  id_token?: string;
  refresh_token?: string;
  expires_at?: number;
  session_state?: string;
  scope?: string;
};

export type XeroSessionType = {
  decodedAccessToken: XeroAccessToken;
  decodedIdToken: XeroIdToken;
  tokenSet: TokenSet;
  allTenants: any[]; // This needs to be more specific
  activeTenant: any; // This needs to be a more specific type
};
