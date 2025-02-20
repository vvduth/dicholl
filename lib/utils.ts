import { error } from "console";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function covertoPlainObj<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// Format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (error.name === "ZodError") {
    // handle zod error
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.error[field].message
    );

    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    // prisma error
    const field = error.meta?.target ? error.meta.target[0] : "Field";
    return `${field} already exists`;
  } else {
    // other
    return typeof error.message === "string"
      ? error.message
      : "An error occurred";
  }
}

// rounde numebr to 2 decimal places
export function roundToTwo(value: number | string): number {
  if (typeof value === "string") {
    value = parseFloat(value);
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Invalid value");
  }
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "EUR",
  style: "currency",
  minimumFractionDigits: 2,
})

// format currentcy
export function formatCurrency(value: number |string |null) {

  if (typeof value === "number") {
    return CURRENCY_FORMATTER.format(value);
  } else if (typeof value === "string") {
    return CURRENCY_FORMATTER.format(Number(value));
  } else {
    return NaN
  }
  
}