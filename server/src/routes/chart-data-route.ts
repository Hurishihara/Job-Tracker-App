import Elysia from 'elysia';

export const chartDataRouter = new Elysia({ prefix: '/chart-data' })
    .get('/pie-chart', async ({ set }) => {})
    .get('/line-chart', async ({ set }) => {})