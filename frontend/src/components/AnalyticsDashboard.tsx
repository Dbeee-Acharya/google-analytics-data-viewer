import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRealtimeData, fetchTopPagesData } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface AnalyticsDashboardProps {
    siteId: string;
    themeColor: string; // e.g., "bg-blue-600"
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

    const { data: realtimeData, isLoading: isLoadingRealtime } = useQuery({
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

    const currentData = viewMode === "realtime" ? realtimeData : topPagesData;
    const isLoading = viewMode === "realtime" ? isLoadingRealtime : isLoadingTopPages;

    const totalUsers = realtimeData?.reduce(
        (acc, page) => acc + parseInt(page.activeUsers || "0", 10),
        0
    );

    return (
        <div className="min-h-screen bg-background p-8 font-sans">
            <div className="mx-auto max-w-4xl space-y-8">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight capitalize">{siteId} Analytics</h1>
                        <p className="text-muted-foreground">
                            {viewMode === "realtime" ? "Realtime Active Users" : "Top Pages (Last 3 Days)"}
                        </p>
                    </div>

                    <Card className={cn("w-48 border-none shadow-lg", themeColor, "text-white")}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-white/80">
                                Total Active Users
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">
                                {isLoadingRealtime ? <Skeleton className="h-10 w-20 bg-white/20" /> : totalUsers}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Data List */}
                <Card className="border shadow-sm">
                    <CardHeader>
                        <CardTitle>Top Pages</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[70%]">Page Title</TableHead>
                                    <TableHead className="text-right">
                                        {viewMode === "realtime" ? "Active Users" : "Views"}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <TableRow key={i}>
                                            <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-4 w-[50px] ml-auto" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : currentData?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={2} className="text-center h-24 text-muted-foreground">
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    currentData?.map((page, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">
                                                <div className="flex flex-col">
                                                    <span>{page.pageTitle === '(not set)' ? 'Home' : page.pageTitle}</span>
                                                    <span className="text-xs text-muted-foreground">{page.pagePath}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Badge variant="secondary" className="font-mono text-base">
                                                    {viewMode === "realtime" ? page.activeUsers : page.views}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
