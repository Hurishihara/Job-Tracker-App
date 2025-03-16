import { Static } from "elysia";
import { _createUser } from "../controllers/user-auth-controller";

export type CreateUserDTO = Static<typeof _createUser>;
export type LoginUserDTO = Pick<CreateUserDTO, 'email' | 'password'>;