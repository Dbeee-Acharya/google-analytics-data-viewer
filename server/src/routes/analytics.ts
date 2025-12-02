import { Hono } from 'hono';
import { analyticsService } from '../services/analytics.js';
import { config, type SiteId } from '../config.js';

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

    try {
        const data = await analyticsService.getRealtimeTopPages(siteConfig.propertyId);
        return c.json({ data });
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

    try {
        const data = await analyticsService.getTopPagesLast3Days(siteConfig.propertyId);
        return c.json({ data });
    } catch (error) {
        return c.json({ error: 'Failed to fetch top pages data' }, 500);
    }
});

export default analytics;
