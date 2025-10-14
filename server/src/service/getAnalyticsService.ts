import config from "../config/config.js";
import analyticsDataClient from "../lib/googleAnalytics.js";

const ekantipurPropertyId = config.ekantipurPropertyId;
const tkpPropertyId = config.tkpPropertyId;

type website = "tkp" | "ekantipur";

export async function getRealtimeActiveUsers(website: website) {
  let propertyId = website === "tkp" ? tkpPropertyId : ekantipurPropertyId;

  const [response] = await analyticsDataClient.runRealtimeReport({
    property: `properties/${propertyId}`,
    metrics: [
      { name: 'activeUsers' }
    ],
  });

  return response.totals?.[0]?.metricValues?.[0]?.value ?? 0;
}
