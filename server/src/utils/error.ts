export class UnauthorizedError extends Error {
    constructor(public message: string, public name: string) {
        super(message);
        this.name = name
    }
}

export class ForbiddenError extends Error {
    constructor(public message: string, public name: string) {
        super(message);
        this.name = name
    }
}

export class BadRequestError extends Error {
    constructor(public message: string, public name: string) {
        super(message);
        this.name = name
    }
}

export class InternalServerError extends Error {
    constructor(public message: string, public name: string) {
        super(message);
        this.name = name
    }
}


