import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classLists: ClassValue[]) => twMerge(clsx(classLists));

// adapted from https://stackoverflow.com/a/57755270/18346347
export function keysOfEnum<T extends { [key: number]: string | number }>(
  e: T
): (keyof T)[] {
  return Object.keys(e).filter((v) => isNaN(Number(v))) as (keyof typeof e)[];
}
