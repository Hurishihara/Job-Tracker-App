import Elysia, { t } from "elysia";
import { betterAuthMiddleware } from "../middlewares/auth-middleware";
import { ChartDataService } from "../services/chart-data-service";
import { UnauthorizedError } from "../utils/error";
import { StatusCodes } from "http-status-codes";

export const ChartDataRoutes = new Elysia({ name: 'Controller.ChartData', prefix: '/chart-data' })
    .use(betterAuthMiddleware)
    .use(ChartDataService)
    .get('/get-pie-chart-data', async ({ user, getPieChartData, set }) => {
        try {
            if (!user) {
                throw new UnauthorizedError('Please log in to get chart data', 'Unauthorized');
            }
            const res = await getPieChartData(user.id);
            set.status = StatusCodes.OK;
            return res;
        }
        catch (err) {
            console.error('Error in ChartDataController:', err);
        }
    }, {
        auth: true,
        detail: {
            summary: 'Get pie chart data',
            description: 'Get pie chart data for a user',
            tags: ['Chart Data']
        }
    })
    .get('/get-line-chart-data', async ({ user, getLineChartData, set, query }) => {
        try {
            if (!user) {
                throw new UnauthorizedError('Please log in to get chart data', 'Unauthorized');
            }
            const { startMonth, endMonth } = query
            console.log('startMonth:', startMonth, 'endMonth:', endMonth);
            set.status = StatusCodes.OK;
            const res = await getLineChartData(user.id, startMonth, endMonth);
            return res;
        }
        catch (err) {
            console.error('Error in ChartDataController:', err);
        }
    }, {
        auth: true,
        query: t.Object({
            startMonth: t.Number(),
            endMonth: t.Number()
        }),
        detail: {
            summary: 'Get line chart data',
            description: 'Get line chart data for a user',
            tags: ['Chart Data']
        }
    })
