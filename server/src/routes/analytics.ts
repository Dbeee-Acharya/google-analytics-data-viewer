import { Hono } from 'hono';
import { analyticsService } from '../services/analytics.js';
import { config, type SiteId } from '../config.js';
import redis from '../lib/redis.js';

const analytics = new Hono();

analytics.get('/:siteId/realtime', async (c) => {
    const siteId = c.req.param('siteId') as SiteId;
    const siteConfig = config.sites[siteId];

    if (!siteConfig) {
        return c.json({ error: 'Invalid site ID' }, 400);
    }

    if (!siteConfig.propertyId) {
        return c.json({ error: 'Property ID not configured for this site' }, 500);
    }

    const cacheKey = `analytics:realtime:${siteId}`;
    try {
        const cachedData = await redis?.get(cacheKey);
        if (cachedData) {
            return c.json({ data: JSON.parse(cachedData) });
        }

        const [data, totalActiveUsers] = await Promise.all([
            analyticsService.getRealtimeTopPages(siteConfig.propertyId),
            analyticsService.getRealtimeTotalActiveUsers(siteConfig.propertyId)
        ]);

        const responseData = { data, totalActiveUsers };

        // Cache for 5 minutes (300 seconds)
        await redis?.set(cacheKey, JSON.stringify(responseData), 'EX', 300);

        return c.json(responseData);
    } catch (error) {
        return c.json({ error: 'Failed to fetch realtime data' }, 500);
    }
});

analytics.get('/:siteId/top-pages', async (c) => {
    const siteId = c.req.param('siteId') as SiteId;
    const siteConfig = config.sites[siteId];

    if (!siteConfig) {
        return c.json({ error: 'Invalid site ID' }, 400);
    }

    if (!siteConfig.propertyId) {
        return c.json({ error: 'Property ID not configured for this site' }, 500);
    }

    const cacheKey = `analytics:toppages:${siteId}`;
    try {
        const cachedData = await redis?.get(cacheKey);
        if (cachedData) {
            return c.json({ data: JSON.parse(cachedData) });
        }

        const data = await analyticsService.getTopPagesLast3Days(siteConfig.propertyId);

        // Cache for 5 minutes (300 seconds)
        await redis?.set(cacheKey, JSON.stringify(data), 'EX', 300);

        return c.json({ data });
    } catch (error) {
        return c.json({ error: 'Failed to fetch top pages data' }, 500);
    }
});

export default analytics;
