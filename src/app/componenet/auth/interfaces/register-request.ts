export class RegisterRequest {
    constructor(
        public username: string, 
        public password: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public cin: string,
        public nationality: string,
        public licenseExpirationDate: string,
        public joinDate: string,
    ) {}
}
