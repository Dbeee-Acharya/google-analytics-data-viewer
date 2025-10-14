import { Hono } from "hono";
import { getRealtimeActiveUsers } from "../../service/getAnalyticsService.js";

const ekantipurAnalytics = new Hono()

ekantipurAnalytics.get('/realtime', async (c) => {
  try {
    const activeUsers = await getRealtimeActiveUsers('ekantipur');

    return c.json({
      activeUsers
    });
  } catch (error) {
    console.error("Error fetching realtime ekantipur data", error);

    return c.json({
      success: false,
      message: "Could not fetch realtime data for ekantipur"
    }, 500)
  };
})

export default ekantipurAnalytics;


