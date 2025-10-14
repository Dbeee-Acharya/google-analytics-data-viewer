import { GoogleAuth } from "google-auth-library";
import config from "../config/config.js";

const auth = new GoogleAuth({
  keyFile: config.serviceFilePath,
  scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
});

export default auth;
