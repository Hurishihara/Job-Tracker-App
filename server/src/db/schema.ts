import { relations } from 'drizzle-orm';
import { boolean, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['Pending', 'Initial Interview', 'Final Interview', 'Job Offer', 'Rejected']);
export const jobTypeEnum = pgEnum('job_type', ['Full-time', 'Part-time', 'Internship', 'Contractual', 'Freelance', 'Temporary', 'Gig', 'Seasonal']);

export const user = pgTable('user', {
    id: text('id').primaryKey(),
    name: varchar('username', { length: 30 }).notNull(),
    email: varchar('email', { length: 100 }).notNull().unique(),
    image: text('image'),
    emailVerified: boolean('email_verified').notNull(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
});

export const session = pgTable('session', {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })
})

export const account = pgTable('account', {
    id: text('id').primaryKey(),
	accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
})

export const verification = pgTable('verification', {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at'),
})


export const jobApplication = pgTable('job_applications', {
    id: uuid('id').defaultRandom().primaryKey(),
    companyName: varchar('company_name', { length: 60 }).notNull(),
    jobTitle: varchar('job_title', { length: 30 }).notNull(),
    jobStatus: statusEnum().notNull(),
    location: varchar('location', { length: 100 }).notNull(),
    applicationDate: timestamp('application_date', { mode: 'date'}),
    interviewDate: timestamp('interview_date', { mode: 'date'}),
    jobType: jobTypeEnum().notNull(),
    applicationMethod: varchar('application_method', { length: 50 }).notNull(),
    jobLink: text('job_link'),
    notes: varchar('notes', { length: 60 }),
    userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }).notNull(),
})

export const userJobStatusUpdate = pgTable('user_job_status_updates', {
    id: uuid('id').defaultRandom().primaryKey(),
    jobApplicationId: uuid('job_application_id').references(() => jobApplication.id, { onDelete: 'cascade' }).notNull(),
    jobStatus: statusEnum().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (table) => [{
    uniqueConsecutiveStatus: uniqueIndex('unique_consecutive_status').on(table.jobApplicationId, table.jobStatus)
}])

// Relations

export const userTableRelations = relations(user, ({ many }) => ({
    jobApplication: many(jobApplication)
}))

export const jobApplicationTableRelations = relations(jobApplication, ({ one, many }) => ({
    user: one(user, {
        fields: [jobApplication.userId],
        references: [user.id]
    }),
    statusUpdates: many(userJobStatusUpdate)
}))

export const userJobStatusUpdateTableRelations = relations(userJobStatusUpdate, ({ one }) => ({
    jobApplication: one(jobApplication, {
        fields: [userJobStatusUpdate.jobApplicationId],
        references: [jobApplication.id]
    })
}))

export const table = {
    user,
    jobApplication,
    userJobStatusUpdate
} as const

export type Table = typeof table