import Elysia, { t } from "elysia";
import { betterAuthMiddleware } from "../middlewares/auth-middleware";
import { ChartDataService } from "../services/chart-data-service";
import { UnauthorizedError } from "../utils/error";
import { StatusCodes } from "http-status-codes";

export const ChartDataRoutes = new Elysia({ name: 'Controller.ChartData', prefix: '/chart-data' })
    .use(betterAuthMiddleware)
    .use(ChartDataService)
    .get('/get-pie-chart-data', async ({ user, getPieChartData, set, query }) => {
        try {
            if (!user) {
                throw new UnauthorizedError('Please log in to get chart data', 'Unauthorized');
            }
            const { startMonth, endMonth } = query
            const res = await getPieChartData(user.id, startMonth, endMonth);
            set.status = StatusCodes.OK;
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
    .get('/get-bar-chart-data', async ({ user, getBarChartData, set, query }) => {
        try {
            if (!user) {
                throw new UnauthorizedError('Please log in to get chart data', 'Unauthorized');
            }
            const { startMonth, endMonth } = query
            const res = await getBarChartData(user.id, startMonth, endMonth);
            set.status = StatusCodes.OK;
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
            summary: 'Get bar chart data',
            description: 'Get bar chart data for a user',
            tags: ['Chart Data']
        }
    })
    .get('/get-area-chart-data', async ({ user, getAreaChartData, set, query }) => {
        try {
            if (!user) {
                throw new UnauthorizedError('Please log in to get chart data', 'Unauthorized');
            }
            const { startMonth, endMonth } = query
            const res = await getAreaChartData(user.id, startMonth, endMonth);
            set.status = StatusCodes.OK;
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
            summary: 'Get area chart data',
            description: 'Get area chart data for a user',
            tags: ['Chart Data']
        }
    })
