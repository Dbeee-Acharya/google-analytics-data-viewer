import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { config } from '../config.js';

export class AnalyticsService {
    private client: BetaAnalyticsDataClient;

    constructor() {
        this.client = new BetaAnalyticsDataClient({
            credentials: {
                client_email: config.google.clientEmail,
                private_key: config.google.privateKey,
            },
        });
    }

    async getRealtimeTopPages(propertyId: string) {
        try {
            const [response] = await this.client.runRealtimeReport({
                property: `properties/${propertyId}`,
                dimensions: [
                    { name: 'pageTitle' },
                    { name: 'unifiedScreenName' }, // unifiedScreenName is often used for page path/title in realtime
                ],
                metrics: [
                    { name: 'activeUsers' },
                ],
                limit: 10,
            });

            return response.rows?.map(row => ({
                pageTitle: row.dimensionValues?.[0].value,
                pagePath: row.dimensionValues?.[1].value,
                activeUsers: row.metricValues?.[0].value,
            })) || [];
        } catch (error) {
            console.error('Error fetching realtime data:', error);
            throw error;
        }
    }

    async getTopPagesLast3Days(propertyId: string) {
        try {
            const [response] = await this.client.runReport({
                property: `properties/${propertyId}`,
                dateRanges: [
                    {
                        startDate: '3daysAgo',
                        endDate: 'today',
                    },
                ],
                dimensions: [
                    { name: 'pageTitle' },
                    { name: 'pagePath' },
                ],
                metrics: [
                    { name: 'screenPageViews' },
                ],
                limit: 10,
                orderBys: [
                    {
                        metric: { metricName: 'screenPageViews' },
                        desc: true,
                    },
                ],
            });

            return response.rows?.map(row => ({
                pageTitle: row.dimensionValues?.[0].value,
                pagePath: row.dimensionValues?.[1].value,
                views: row.metricValues?.[0].value,
            })) || [];
        } catch (error) {
            console.error('Error fetching report data:', error);
            throw error;
        }
    }
}

export const analyticsService = new AnalyticsService();
