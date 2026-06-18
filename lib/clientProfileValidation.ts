const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP_RE = /^\d{5}(-\d{4})?$/;
const PHONE_TYPES = new Set(["cell", "home", "work"]);
const SEX_VALUES = new Set(["male", "female"]);

export type PersonValidationInput = {
  firstName: string;
  middleName?: string;
  lastName: string;
  preferredFirstName: string;
  sex: string | null;
  birthDate: Date | string | null;
};

export type ClientProfileValidationInput = {
  firstName: string;
  middleName?: string;
  lastName: string;
  preferredFirstName: string;
  sex: string | null;
  birthDate: Date | string | null;
  email?: string | null;
  phone?: string | null;
  phoneType?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  address?: string | null;
  zipCode?: string | null;
  showSpouse?: boolean;
  spouse?: PersonValidationInput;
  children?: (PersonValidationInput & { key?: string })[];
};

function parseBirthDate(value: Date | string | null | undefined): Date | null {
  if (value == null || value === "") return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  const d = new Date(String(value));
  return Number.isNaN(d.getTime()) ? null : d;
}

function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

function validateBirthDate(value: Date | string | null | undefined, label: string): string | null {
  const date = parseBirthDate(value);
  if (!date) {
    return `${label} birth date is required.`;
  }

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  if (date > today) {
    return `${label} birth date cannot be in the future.`;
  }

  const oldest = new Date();
  oldest.setFullYear(oldest.getFullYear() - 120);
  if (date < oldest) {
    return `${label} birth date is not valid.`;
  }

  return null;
}

function validatePerson(
  person: PersonValidationInput,
  prefix: string,
  label: string,
  errors: Record<string, string>
) {
  if (!person.firstName.trim()) {
    errors[`${prefix}firstName`] = `${label} first name is required.`;
  } else if (person.firstName.trim().length > 80) {
    errors[`${prefix}firstName`] = `${label} first name is too long.`;
  }

  if (!person.lastName.trim()) {
    errors[`${prefix}lastName`] = `${label} last name is required.`;
  } else if (person.lastName.trim().length > 80) {
    errors[`${prefix}lastName`] = `${label} last name is too long.`;
  }

  if (!person.preferredFirstName.trim()) {
    errors[`${prefix}preferredFirstName`] = `${label} preferred first name is required.`;
  } else if (person.preferredFirstName.trim().length > 80) {
    errors[`${prefix}preferredFirstName`] = `${label} preferred first name is too long.`;
  }

  if (!person.sex || !SEX_VALUES.has(person.sex)) {
    errors[`${prefix}sex`] = `${label} sex is required.`;
  }

  const birthError = validateBirthDate(person.birthDate, label);
  if (birthError) {
    errors[`${prefix}birthDate`] = birthError;
  }

  if (person.middleName && person.middleName.trim().length > 80) {
    errors[`${prefix}middleName`] = `${label} middle name is too long.`;
  }
}

export function validateClientProfileInput(input: ClientProfileValidationInput): {
  errors: Record<string, string>;
  firstError: string | null;
} {
  const errors: Record<string, string> = {};

  validatePerson(
    {
      firstName: input.firstName,
      middleName: input.middleName,
      lastName: input.lastName,
      preferredFirstName: input.preferredFirstName,
      sex: input.sex,
      birthDate: input.birthDate,
    },
    "",
    "Client",
    errors
  );

  const phone = String(input.phone ?? "").trim();
  if (!phone) {
    errors.phone = "Phone number is required.";
  } else {
    const digits = phoneDigits(phone);
    if (digits.length < 10 || digits.length > 15) {
      errors.phone = "Enter a valid phone number (at least 10 digits).";
    }
  }

  const phoneType = String(input.phoneType ?? "").trim();
  if (!phoneType || !PHONE_TYPES.has(phoneType)) {
    errors.phoneType = "Select a phone type.";
  }

  const email = String(input.email ?? "").trim();
  if (email && !EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const zipCode = String(input.zipCode ?? "").trim();
  if (zipCode && !ZIP_RE.test(zipCode)) {
    errors.zipCode = "Enter a valid US zip code (e.g. 12345 or 12345-6789).";
  }

  const city = String(input.city ?? "").trim();
  if (city && city.length > 80) {
    errors.city = "City name is too long.";
  }

  const address = String(input.address ?? "").trim();
  if (address && address.length > 200) {
    errors.address = "Address is too long.";
  }

  if (input.showSpouse && input.spouse) {
    validatePerson(input.spouse, "spouse.", "Spouse", errors);
  }

  (input.children ?? []).forEach((child, index) => {
    const key = child.key ?? String(index);
    validatePerson(child, `child.${key}.`, `Child ${index + 1}`, errors);
  });

  const firstError = Object.values(errors)[0] ?? null;
  return { errors, firstError };
}
