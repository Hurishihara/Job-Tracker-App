import { User } from "better-auth/types";
import Elysia from "elysia";
import { jobApplication } from "../db/schema";
import { and, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../db/db";

export const ChartDataService = new Elysia({ name: 'Service.ChartData' })
    .decorate('getPieChartData', async (userId: User['id']) => {
        try {
            const res = await db.select({
                status: jobApplication.jobStatus
            }).from(jobApplication).where(eq(jobApplication.userId, userId));
           const statusCount: Record<string, number> = {};
           const statusColors: Record<string, string> = {
                'Pending': '#ffb403',
                'Initial Interview': '#a4aab6',
                'Final Interview': '#2cccfe',
                'Job Offer': '#57f000',
                'Rejected': '#fe3839'
           } 
           res.forEach((jobApp) => {
            statusCount[jobApp.status] = (statusCount[jobApp.status] || 0) + 1;
           });
           return {
                data: Object.entries(statusCount).map(([status, applications]) => ({
                    status,
                    applications,
                    fill: statusColors[status] || '#ccc'
                }))
           };
        }
        catch (err) {
            console.error(err);
            return { data: [] };
        }
    })
    .decorate('getLineChartData', async (userId: User['id'], startMonth: number, endMonth: number) => {
        try {
            const res = await db.execute(sql`
                WITH months AS (
                    SELECT 'Jan' AS month, 1 AS month_number UNION ALL
                    SELECT 'Feb', 2 UNION ALL
                    SELECT 'Mar', 3 UNION ALL
                    SELECT 'Apr', 4 UNION ALL
                    SELECT 'May', 5 UNION ALL
                    SELECT 'Jun', 6 UNION ALL
                    SELECT 'Jul', 7 UNION ALL
                    SELECT 'Aug', 8 UNION ALL
                    SELECT 'Sep', 9 UNION ALL
                    SELECT 'Oct', 10 UNION ALL
                    SELECT 'Nov', 11 UNION ALL
                    SELECT 'Dec', 12
                )
                SELECT 
                    months.month,
                    months.month_number,
                    COALESCE(job_data."Pending", 0) AS "Pending",
                    COALESCE(job_data."Initial Interview", 0) AS "Initial Interview",
                    COALESCE(job_data."Final Interview", 0) AS "Final Interview",
                    COALESCE(job_data."Job Offer", 0) AS "Job Offer",
                    COALESCE(job_data."Rejected", 0) AS "Rejected"
                FROM months
                LEFT JOIN (
                    SELECT 
                        TO_CHAR(${jobApplication.applicationDate}, 'Mon') AS month,
                        EXTRACT(MONTH FROM ${jobApplication.applicationDate}) AS month_number,
                        COUNT(*) FILTER (WHERE ${jobApplication.jobStatus} = 'Pending')::INTEGER AS "Pending",
                        COUNT(*) FILTER (WHERE ${jobApplication.jobStatus} = 'Initial Interview')::INTEGER AS "Initial Interview",
                        COUNT(*) FILTER (WHERE ${jobApplication.jobStatus} = 'Final Interview')::INTEGER AS "Final Interview",
                        COUNT(*) FILTER (WHERE ${jobApplication.jobStatus} = 'Job Offer')::INTEGER AS "Job Offer",
                        COUNT(*) FILTER (WHERE ${jobApplication.jobStatus} = 'Rejected')::INTEGER AS "Rejected"
                    FROM ${jobApplication}
                    WHERE 
                        ${jobApplication.userId} = ${userId}
                        AND EXTRACT(MONTH FROM ${jobApplication.applicationDate}) BETWEEN ${startMonth} AND ${endMonth}
                    GROUP BY month, month_number
                ) AS job_data ON months.month_number = job_data.month_number
                WHERE months.month_number BETWEEN ${startMonth} AND ${endMonth} -- ✅ Filter months dynamically
                ORDER BY months.month_number;
            `);
            const statusColors: Record<string, string> = {
                'Pending': '#ffb403',
                'Initial Interview': '#a4aab6',
                'Final Interview': '#2cccfe',
                'Job Offer': '#57f000',
                'Rejected': '#fe3839'
            }
            return res.rows.map((row) => ({
                month: row.month,
                Pending: row['Pending'],
                'Initial Interview': row['Initial Interview'],
                'Final Interview': row['Final Interview'],
                'Job Offer': row['Job Offer'],
                Rejected: row['Rejected'],
            }))
        } catch (err) {
            console.error(err);
            return { data: [] };
        }
    });