export type SignInValues = {
  email: string;
  password: string;
};

export type SignUpValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
export const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Latin, Latin-1/Extended, and Bangla letters, plus common name separators.
const NAME_PATTERN =
  /^[A-Za-z\u00C0-\u024F\u0980-\u09FF][A-Za-z\u00C0-\u024F\u0980-\u09FF\s.'-]*$/;

export function validateEmail(email: string): string | undefined {
  const value = email.trim();

  if (!value) return "Email address is required.";
  if (!EMAIL_PATTERN.test(value)) return "Enter a valid email address.";

  return undefined;
}

export function validateSignIn(values: SignInValues): FieldErrors<SignInValues> {
  const errors: FieldErrors<SignInValues> = {};
  const emailError = validateEmail(values.email);

  if (emailError) errors.email = emailError;
  if (!values.password) errors.password = "Password is required.";

  return errors;
}

export function validateSignUp(values: SignUpValues): FieldErrors<SignUpValues> {
  const errors: FieldErrors<SignUpValues> = {};
  const fullName = values.fullName.trim();
  const emailError = validateEmail(values.email);

  if (emailError) errors.email = emailError;

  if (!fullName) {
    errors.fullName = "Full name is required.";
  } else if (fullName.length < 3) {
    errors.fullName = "Use at least 3 characters.";
  } else if (!NAME_PATTERN.test(fullName)) {
    errors.fullName = "Use letters, spaces, dots, or hyphens only.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Use at least 8 characters.";
  } else if (!/[A-Za-z]/.test(values.password) || !/[0-9]/.test(values.password)) {
    errors.password = "Include at least one letter and one number.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

export function validatePhoto(file: File): string | undefined {
  if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
    return "Use a JPG, PNG, or WebP image.";
  }

  if (file.size > MAX_PHOTO_BYTES) {
    return "Image must be 2 MB or smaller.";
  }

  return undefined;
}
