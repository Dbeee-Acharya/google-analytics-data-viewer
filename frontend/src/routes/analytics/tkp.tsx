import { createFileRoute } from '@tanstack/react-router'
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard'

export const Route = createFileRoute('/analytics/tkp')({
    component: RouteComponent,
})

function RouteComponent() {
    return <AnalyticsDashboard siteId="tkp" themeColor="bg-emerald-600" />
}
