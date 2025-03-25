import { User } from "better-auth/types";
import Elysia from "elysia";
import { jobApplication, userJobStatusUpdate } from "../db/schema";
import { and, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../db/db";

export const ChartDataService = new Elysia({ name: 'Service.ChartData' })
    .decorate('getPieChartData', async (userId: User['id'], startMonth: number, endMonth: number) => {
        try {
            const res = await db.select({
                status: jobApplication.jobStatus
            }).from(jobApplication).where(and(
                eq(jobApplication.userId, userId),
                gte(jobApplication.applicationDate, new Date(new Date().getFullYear(), startMonth - 1, 1)),
                lte(jobApplication.applicationDate, new Date(new Date().getFullYear(), endMonth, 0))
            ));
           const statusCount: Record<string, number> = {};
           const statusColors: Record<string, string> = {
                'Pending': '#F59E0B', // amber
                'Initial Interview': '#10B981', // emerald green
                'Final Interview': '#2563EB', // muted royal blue
                'Job Offer': '#FACC15', // gold
                'Rejected': '#EF4444' // muted red
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
                        TO_CHAR(${userJobStatusUpdate.updatedAt}, 'Mon') AS month,
                        EXTRACT(MONTH FROM ${userJobStatusUpdate.updatedAt}) AS month_number,
                        COUNT(*) FILTER (WHERE ${userJobStatusUpdate.jobStatus} = 'Pending')::INTEGER AS "Pending",
                        COUNT(*) FILTER (WHERE ${userJobStatusUpdate.jobStatus} = 'Initial Interview')::INTEGER AS "Initial Interview",
                        COUNT(*) FILTER (WHERE ${userJobStatusUpdate.jobStatus} = 'Final Interview')::INTEGER AS "Final Interview",
                        COUNT(*) FILTER (WHERE ${userJobStatusUpdate.jobStatus} = 'Job Offer')::INTEGER AS "Job Offer",
                        COUNT(*) FILTER (WHERE ${userJobStatusUpdate.jobStatus} = 'Rejected')::INTEGER AS "Rejected"
                    FROM ${userJobStatusUpdate}
                    WHERE 
                        ${userJobStatusUpdate.jobApplicationId} IN (
                            SELECT ${jobApplication.id} FROM ${jobApplication} WHERE ${jobApplication.userId} = ${userId}
                            )
                        AND EXTRACT(MONTH FROM ${userJobStatusUpdate.updatedAt}) BETWEEN ${startMonth} AND ${endMonth}
                        AND EXTRACT(YEAR FROM ${userJobStatusUpdate.updatedAt}) = ${new Date().getFullYear()}
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
    })
    .decorate('getBarChartData', async (userId: User['id'], startMonth: number, endMonth: number) => {
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
                    COALESCE(job_data.total_applications, 0) AS total_applications
                FROM months
                LEFT JOIN (
                    SELECT 
                        EXTRACT(MONTH FROM ${jobApplication.applicationDate}) AS month_number,
                        COUNT(*) AS total_applications
                    FROM ${jobApplication}
                    WHERE 
                        ${jobApplication.userId} = ${userId}  -- ✅ WHERE inside the subquery
                        AND EXTRACT(MONTH FROM ${jobApplication.applicationDate}) BETWEEN ${startMonth} AND ${endMonth}
                    GROUP BY month_number
                ) AS job_data ON months.month_number = job_data.month_number  -- ✅ Fixed JOIN condition
                WHERE months.month_number BETWEEN ${startMonth} AND ${endMonth} 
                ORDER BY months.month_number;
            `);

            return res.rows.map((row) => ({
                month: row.month,
                totalApplications: row.total_applications
            }))
        }
        catch (err) {
            console.error(err);
            return { data: [] };
        }
    })
    .decorate('getAreaChartData', async (userId: User['id'], startMonth: number, endMonth: number) => {
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
                ),
                status_progression AS (
                    SELECT 
                        ${jobApplication.id} AS job_application_id,
                        MIN(${jobApplication.applicationDate}) AS first_application_date,
                        MAX(${userJobStatusUpdate.updatedAt}) FILTER (WHERE ${userJobStatusUpdate.jobStatus} = 'Final Interview') 
                            AS last_final_interview_date
                    FROM ${jobApplication}
                    JOIN ${userJobStatusUpdate} 
                        ON ${jobApplication.id} = ${userJobStatusUpdate.jobApplicationId}
                    WHERE 
                        ${jobApplication.userId} = ${userId}
                        AND EXTRACT(MONTH FROM ${userJobStatusUpdate.updatedAt}) BETWEEN ${startMonth} AND ${endMonth}
                        AND EXTRACT(YEAR FROM ${userJobStatusUpdate.updatedAt}) = ${new Date().getFullYear()}
                    GROUP BY ${jobApplication.id}
                ),
                monthly_avg_days AS (
                    SELECT 
                        EXTRACT(MONTH FROM first_application_date) AS month_number,
                        ROUND(AVG(EXTRACT(DAY FROM (last_final_interview_date - first_application_date))), 2) AS average_days
                    FROM status_progression
                    WHERE last_final_interview_date IS NOT NULL  -- Only count completed transitions
                    GROUP BY month_number
                )
                SELECT 
                    months.month,
                    months.month_number,
                    COALESCE(monthly_avg_days.average_days, 0) AS average_days
                FROM months
                LEFT JOIN monthly_avg_days 
                    ON months.month_number = monthly_avg_days.month_number
                WHERE months.month_number BETWEEN ${startMonth} AND ${endMonth}
                ORDER BY months.month_number;
            `);
    
            return res.rows.map((row) => ({
                month: row.month,
                Days: row.average_days
            }));
        }
        catch (err) {
            console.error(err);
            return { data: [] };
        }
    })