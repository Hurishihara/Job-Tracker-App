import { Static } from "elysia";
import { _createJobApplication } from "../controllers/job-application-controller";

export type CreateJobApplicationDTO =  Static<typeof _createJobApplication>