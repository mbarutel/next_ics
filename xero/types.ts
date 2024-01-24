import { TokenSet } from "openid-client";
import { XeroAccessToken, XeroIdToken } from "xero-node";

export type XeroSessionType = {
  decodedAccessToken: XeroAccessToken;
  decodedIdToken: XeroIdToken;
  tokenSet: TokenSet;
  allTenants: any[]; // This needs to be more specific
  activeTenant: any; // This needs to be a more specific type
};
