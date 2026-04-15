/** Slavic plural form selector: returns 0=one, 1=few, 2=many. */
export function pluralIdx(n: number): 0 | 1 | 2 {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return 2;
  if (b > 1 && b < 5) return 1;
  if (b === 1) return 0;
  return 2;
}

export function plural(n: number, forms: [string, string, string]): string {
  return forms[pluralIdx(n)];
}
