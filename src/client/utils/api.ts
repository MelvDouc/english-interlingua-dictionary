import type { SafeResponse, SerializableEntry } from "$client/types.js";

const API_BASE_URL = "/api/v1";

export default async function api<T>(path: `/${string}`, init?: RequestInit): Promise<SafeResponse<T, unknown>> {
  try {
    const response = await fetch(API_BASE_URL + path, init);
    const data = await response.json();
    return [data as T, null];
  } catch (error) {
    console.log(error);
    return [null, error];
  }
}

export function getEntries(word: string) {
  return api<SerializableEntry[]>(`/entries/${word}`);
}