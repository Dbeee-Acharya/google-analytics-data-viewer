import { BetaAnalyticsDataClient } from "@google-analytics/data";
import auth from "./googleAuth.js";


const analyticsDataClient = new BetaAnalyticsDataClient({
  auth: auth
})

export default analyticsDataClient;

