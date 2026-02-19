import { OK, FAIL } from "../constants";

/** Fisher-Yates shuffle — unbiased, returns a new array */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const pickOK = () => pickRandom(OK);
export const pickFail = () => pickRandom(FAIL);
