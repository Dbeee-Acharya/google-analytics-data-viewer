import { createFileRoute } from '@tanstack/react-router'
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard'

export const Route = createFileRoute('/analytics/ekantipur')({
    component: RouteComponent,
})

function RouteComponent() {
    return <AnalyticsDashboard siteId="ekantipur" themeColor="bg-blue-600" />
}
