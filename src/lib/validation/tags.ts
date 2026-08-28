/**
 * Tag validation utilities using Zod.
 * Official CoC tag format: # followed by letters/numbers.
 * Tags are case-insensitive and max ~12 chars after #.
 */

import { z } from "zod";

// Official CoC tag regex
const TAG_PATTERN = /^#[PYLQGRJCUV0289]+$/i;

export const playerTagSchema = z
  .string()
  .min(3, "Tag too short")
  .max(15, "Tag too long")
  .transform((tag) => {
    // Normalize: ensure starts with #, uppercase
    const normalized = tag.startsWith("#") ? tag : `#${tag}`;
    return normalized.toUpperCase().replace(/O/g, "0"); // O → 0 common mistake
  })
  .refine((tag) => TAG_PATTERN.test(tag), {
    message: "Invalid tag format. Tags contain only letters P,Y,L,Q,G,R,J,C,U,V and numbers 0,2,8,9",
  });

export const clanTagSchema = playerTagSchema; // Same format

export function normalizeTag(tag: string): string {
  const trimmed = tag.trim();
  const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
  return withHash.toUpperCase().replace(/O/g, "0");
}

export function encodeTagForUrl(tag: string): string {
  // Replace # with %23 for URL safety
  return encodeURIComponent(normalizeTag(tag));
}

export function decodeTagFromUrl(encodedTag: string): string {
  return decodeURIComponent(encodedTag);
}

export function validatePlayerTag(tag: string): { valid: boolean; normalized?: string; error?: string } {
  const result = playerTagSchema.safeParse(tag);
  if (result.success) {
    return { valid: true, normalized: result.data };
  }
  return { valid: false, error: result.error.issues[0]?.message };
}

export function validateClanTag(tag: string): { valid: boolean; normalized?: string; error?: string } {
  return validatePlayerTag(tag); // Same validation
}
