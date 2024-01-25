import { XeroClient } from "xero-node";

const client_id: string = process.env.NEXT_XERO_CLIENT_ID!;
const client_secret: string = process.env.NEXT_XERO_SECRET!;
const redirectUrl: string = process.env.REDIRECT_URI!;
const scopes: string =
  "accounting.transactions accounting.contacts";
const grantType: string = "client_credentials";

export const xero = new XeroClient({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUris: [redirectUrl],
  scopes: scopes.split(" "),
  grantType: grantType,
});
