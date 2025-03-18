import Elysia from 'elysia';
import { CreateJobApplicationDTO } from '../types/job-application-types';
import { db } from '../db/db';
import { jobApplication } from '../db/schema';
import { eq } from 'drizzle-orm';
import { PgUUID } from 'drizzle-orm/pg-core';

export const JobApplicationService = new Elysia({ name: 'Service.JobApplication' })
    .decorate('createJobApplication', async ({
        companyName,
        jobTitle,
        jobStatus,
        location,
        applicationDate,
        interviewDate,
        jobType,
        applicationMethod,
        jobLink,
        notes,
        userId
    }: CreateJobApplicationDTO) => {
        try {
            const res = await db.insert(jobApplication).values({
                companyName: companyName,
                jobTitle: jobTitle,
                jobStatus: jobStatus,
                location: location,
                applicationDate: applicationDate,
                interviewDate: interviewDate,
                jobType: jobType,
                applicationMethod: applicationMethod,
                jobLink: jobLink,
                notes: notes,
                userId: userId
            }).returning()
            return { message: 'Job application created successfully', id: res[0] };
        }
        catch (err) {
            console.error(err);
            return { message: 'Error creating job application', data: null };
        }
    })
    .decorate('getJobApplications', async (userId: string) => {
        try {
            const res = await db.select().from(jobApplication).where(eq(jobApplication.userId, userId));
            return { message: 'Job applications retrieved successfully', data: res };
        }
        catch (err) {
            console.error(err);
            return { message: 'Error getting job applications', data: null };
        }
    })
    .decorate('updateJobApplication', async (body: Partial<CreateJobApplicationDTO>) => {
        try {
            if (!body.id) {
                throw new Error('Job application ID is required for update');
            }
            const res = await db.update(jobApplication).set(body).where(eq(jobApplication.id, body.id as string)).returning();
            return { message: 'Job application updated successfully', data: res };
        }
        catch (err) {
            console.error(err);
            return { message: 'Error updating job application', data: null };
        }
    })
    .decorate('deleteJobApplication', async ({ id }: { id: CreateJobApplicationDTO['id'] }) => {
        try {
            if (!id) {
                throw new Error('Job application ID is required for deletion');
            }
            const res = await db.delete(jobApplication).where(eq(jobApplication.id, id))
            return { message: 'Job application deleted successfully', data: res };
        }
        catch (err) {
            console.error(err);
            return { message: 'Error deleting job application', data: null };
        }
    })