import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeLLMText(input: string): string {
  return input
    // remove invisible/odd spaces
    .replace(/[\u200B-\u200D\u2060\u00A0]/g, ' ')
    // ensure a newline before any bullet-like marker that isn't already at line start
    .replace(/([^\n])\s*[•*-]\s+/g, (_m, p1) => `${p1}\n- `)
    // unify bullets to hyphen
    .replace(/[•*]\s+/g, '- ')
    // collapse triple spaces
    .replace(/[ \t]{2,}/g, ' ')
    // trim trailing spaces on lines
    .replace(/[ \t]+$/gm, '')
    // ensure a blank line before first list if missing after a sentence
    .replace(/([.!?])\s*\n- /, '$1\n\n- ');
}
