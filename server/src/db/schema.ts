import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['Pending', 'Initial Interview', 'Final Interview', 'Job Offer', 'Rejected']);
export const jobTypeEnum = pgEnum('job_type', ['Full-time', 'Part-time', 'Internship', 'Contractual', 'Freelance', 'Temporary', 'Gig', 'Seasonal']);

export const UsersTable = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    firstName: varchar('first_name', { length: 50 }).notNull(),
    lastName: varchar('last_name', { length: 50 }).notNull(),
    email: varchar('email', { length: 100 }).notNull().unique(),
    password: varchar('password', { length: 100 }).notNull(),
});


export const JobApplicationsTable = pgTable('job_applications', {
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
    userId: uuid('user_id').references(() => UsersTable.id).notNull(),
})

export const UserJobStatusUpdatesTable = pgTable('user_job_status_updates', {
    id: uuid('id').defaultRandom().primaryKey(),
    jobApplicationId: uuid('job_application_id').references(() => JobApplicationsTable.id).notNull(),
    jobStatus: statusEnum().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (table) => [{
    uniqueConsecutiveStatus: uniqueIndex('unique_consecutive_status').on(table.jobApplicationId, table.jobStatus)
}])

// Relations

export const UsersTableRelations = relations(UsersTable, ({ many }) => ({
    jobApplications: many(JobApplicationsTable)
}))

export const JobApplicationsTableRelations = relations(JobApplicationsTable, ({ one, many }) => ({
    user: one(UsersTable, {
        fields: [JobApplicationsTable.userId],
        references: [UsersTable.id]
    }),
    statusUpdates: many(UserJobStatusUpdatesTable)
}))

export const UserJobStatusUpdatesTableRelations = relations(UserJobStatusUpdatesTable, ({ one}) => ({
    jobApplication: one(JobApplicationsTable, {
        fields: [UserJobStatusUpdatesTable.jobApplicationId],
        references: [JobApplicationsTable.id]
    })
}))

export const table = {
    UsersTable,
    JobApplicationsTable,
    UserJobStatusUpdatesTable
} as const

export type Table = typeof table