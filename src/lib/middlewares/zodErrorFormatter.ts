import { z } from "zod";

/**
 * it's a zod validation error formatter
 * @param err z.ZodError
 * @returns Array<Record<string, any>>
 */
const zodErrorFormatter = (err: z.ZodError) => {
  //   const errors: Record<string, any> = {};
  const errors: Array<Record<string, any>> = [];

  // checks if the error is z.ZodError or not
  if (err instanceof z.ZodError) {
    err.issues.map((issue) => {
      const pathLength = issue.path.length;
      // checks the path length for the error property
      if (pathLength > 0) {
        // errors[issue.path[pathLength - 1]] = { message: issue.message };
        errors.push({
          property: issue.path[pathLength - 1],
          errorMessage: issue.message,
        });
      } else {
        errors.push({ property: "", errorMessage: issue.message });
        // errors["error"] = { message: issue.message };
      }
    });
    return errors;
  }
  // returns empty array if it's not a zod error
  return errors;
};

export default zodErrorFormatter;
