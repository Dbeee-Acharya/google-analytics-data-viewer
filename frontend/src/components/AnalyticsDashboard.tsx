import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRealtimeData, fetchTopPagesData } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { config } from "@/config";

interface AnalyticsDashboardProps {
    siteId: string;
    themeColor: string; // e.g., "blue", "green"
}

type ViewMode = "realtime" | "top-pages";

export function AnalyticsDashboard({ siteId, themeColor }: AnalyticsDashboardProps) {
    const [viewMode, setViewMode] = useState<ViewMode>("realtime");

    // Switch view mode every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setViewMode((prev) => (prev === "realtime" ? "top-pages" : "realtime"));
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const { data: realtimeResponse, isLoading: isLoadingRealtime } = useQuery({
        queryKey: ["analytics", siteId, "realtime"],
        queryFn: () => fetchRealtimeData(siteId),
        refetchInterval: 10000, // Refetch every 10s
    });

    const { data: topPagesData, isLoading: isLoadingTopPages } = useQuery({
        queryKey: ["analytics", siteId, "top-pages"],
        queryFn: () => fetchTopPagesData(siteId),
        refetchInterval: 60000, // Refetch every 1m
        enabled: viewMode === "top-pages",
    });

    const currentData = viewMode === "realtime" ? realtimeResponse?.data : topPagesData;
    const isLoading = viewMode === "realtime" ? isLoadingRealtime : isLoadingTopPages;

    const totalUsers = realtimeResponse?.totalActiveUsers || "0";

    // Filter ignored titles
    const ignoredTitles = config.ignoredTitles[siteId as keyof typeof config.ignoredTitles] || [];

    const processedData = currentData?.map(page => ({
        ...page,
        displayTitle: page.pageTitle === '(not set)' ? 'Home' : page.pageTitle
    }));

    const filteredData = processedData?.filter(page =>
        !ignoredTitles.includes(page.pageTitle) &&
        !ignoredTitles.includes(page.displayTitle)
    );

    // Theme colors
    const isBlue = themeColor.includes("blue");
    const primaryColor = isBlue ? "bg-blue-600" : "bg-emerald-600";
    const shadowColor = isBlue ? "shadow-blue-500/50" : "shadow-emerald-500/50";
    const borderColor = isBlue ? "border-blue-200" : "border-emerald-200";
    const badgeColor = isBlue ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800";

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans overflow-hidden">
            <div className="w-full space-y-8">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-12">
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <h1 className="text-5xl font-extrabold tracking-tight capitalize text-slate-900">
                                {siteId} Analytics
                            </h1>
                            {viewMode === "realtime" && (
                                <span className="relative flex h-6 w-6">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-6 w-6 bg-red-600"></span>
                                </span>
                            )}
                        </div>
                        <p className="text-2xl text-slate-500 font-medium">
                            {viewMode === "realtime" ? "Realtime Active Users" : "Top Pages (Last 3 Days)"}
                        </p>
                    </div>

                    <Card className={cn("w-auto min-w-[200px] border-none shadow-2xl transform hover:scale-105 transition-transform duration-300", primaryColor, shadowColor)}>
                        <CardContent className="p-4 flex flex-row items-center justify-center gap-4">
                            <div className="text-5xl font-black text-white tracking-tight">
                                {isLoadingRealtime
                                    ? <Skeleton className="h-12 w-24 bg-white/20" />
                                    : totalUsers}
                            </div>

                        </CardContent>
                    </Card>
                </div>

                {/* Data List */}
                <div className="grid gap-4">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-24 w-full rounded-xl" />
                        ))
                    ) : filteredData?.length === 0 ? (
                        <div className="text-center text-2xl text-slate-400 py-16 font-light">
                            No data available
                        </div>
                    ) : (
                        filteredData?.map((page, index) => (
                            <Card
                                key={index}
                                className={cn(
                                    "border-l-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
                                    borderColor,
                                    shadowColor
                                )}
                            >
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div className="flex-1 pr-6 flex items-center gap-4">
                                        <span className="text-4xl font-black text-slate-200/80 font-mono">
                                            #{index + 1}
                                        </span>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-800 leading-tight mb-2 line-clamp-2">
                                                {page.displayTitle}
                                            </h3>
                                            <p className="text-base text-slate-500 font-medium truncate">
                                                {page.pagePath}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <Badge
                                            variant="secondary"
                                            className={cn("text-3xl px-5 py-2 rounded-full font-black", badgeColor)}
                                        >
                                            {viewMode === "realtime" ? page.activeUsers : page.views}
                                        </Badge>
                                        <span className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">
                                            {viewMode === "realtime" ? "Active" : "Views"}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
