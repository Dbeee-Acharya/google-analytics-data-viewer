export interface AnalyticsData {
  pageTitle: string
  pagePath: string
  activeUsers?: string
  views?: string
}

export interface AnalyticsResponse {
  data: AnalyticsData[]
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface RealtimeAnalyticsResponse {
  data: AnalyticsData[]
  totalActiveUsers: string
}

export const fetchRealtimeData = async (
  siteId: string,
): Promise<RealtimeAnalyticsResponse> => {
  const response = await fetch(`${BASE_URL}analytics/${siteId}/realtime`)
  if (!response.ok) {
    throw new Error('Failed to fetch realtime data')
  }
  const json = await response.json()
  return json
}

export const fetchTopPagesData = async (
  siteId: string,
): Promise<AnalyticsData[]> => {
  const response = await fetch(`${BASE_URL}analytics/${siteId}/top-pages`)
  if (!response.ok) {
    throw new Error('Failed to fetch top pages data')
  }
  const json = await response.json()
  return json.data
}
