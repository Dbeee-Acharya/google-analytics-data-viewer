export interface AnalyticsData {
    pageTitle: string;
    pagePath: string;
    activeUsers?: string;
    views?: string;
}

export interface AnalyticsResponse {
    data: AnalyticsData[];
}

const BASE_URL = 'http://localhost:3000/analytics';

export const fetchRealtimeData = async (siteId: string): Promise<AnalyticsData[]> => {
    const response = await fetch(`${BASE_URL}/${siteId}/realtime`);
    if (!response.ok) {
        throw new Error('Failed to fetch realtime data');
    }
    const json = await response.json();
    return json.data;
};

export const fetchTopPagesData = async (siteId: string): Promise<AnalyticsData[]> => {
    const response = await fetch(`${BASE_URL}/${siteId}/top-pages`);
    if (!response.ok) {
        throw new Error('Failed to fetch top pages data');
    }
    const json = await response.json();
    return json.data;
};
