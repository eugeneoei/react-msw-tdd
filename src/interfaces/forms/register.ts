export interface IRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IRegisterForm extends IRegister {
    confirmPassword: string;
}