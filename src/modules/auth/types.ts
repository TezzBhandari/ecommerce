import { z } from "zod";

// USER LOGIN REQUEST SCHEMA & TYPES
const loginRequestBodySchema = z.object({
  email: z
    .string({ required_error: "email or username is required" })
    .trim()
    .min(1, { message: "email or username is required" })
    .email({ message: "invalid email" }),
  // .email({ message: "invalid email" }),
  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(1, { message: "password is required" }),
  // .min(8, { message: "password should at least be 8 characters" })
  // .max(20, { message: "password should not be more than 20 characters" }),
});
const loginSchema = z.object({
  body: loginRequestBodySchema,
});

// USER REGISTRATION

// USER REGISTRATION REQUEST SCHEMA & TYPES
const userRegistrationRequestBodySchema = z.object({
  fullname: z
    .string({ required_error: "firstname is required" })
    .trim()
    .min(1, { message: "firstname is required" }),
  address: z
    .string({ required_error: "address is required" })
    .trim()
    .min(1, { message: "address is required" }),

  email: z
    .string({ required_error: "email is required" })
    .trim()
    .min(1, { message: "email is required" })
    .email({ message: "invalid email" }),
  phoneNumber: z
    .string({ required_error: "phone number is required" })
    .trim()
    .min(10, { message: "invalid phone number" }),
  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(8, { message: "password should at least be 8 characters" })
    .max(20, { message: "password should not be more than 20 characters" }),
});

const userRegistrationSchema = z.object({
  body: userRegistrationRequestBodySchema,
});

type LoginRequestBody = z.infer<typeof loginRequestBodySchema>;

type UserRegistrationRequestBody = z.infer<
  typeof userRegistrationRequestBodySchema
>;

export type { LoginRequestBody, UserRegistrationRequestBody };

export {
  loginRequestBodySchema,
  loginSchema,
  userRegistrationRequestBodySchema,
  userRegistrationSchema,
};
