export type RegistrationForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegistrationFormValidationError = {
  [K in keyof RegistrationForm]?: string | null;
};
