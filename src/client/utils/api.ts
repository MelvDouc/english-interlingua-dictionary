import type { SafeResponse, SerializableEntry } from "$client/types.js";
import { getAuthToken } from "$client/utils/local-storage.js";

const API_BASE_URL = "/api/v1";

export default async function api<T>(path: `/${string}`, init?: RequestInit): Promise<SafeResponse<T, unknown>> {
  try {
    const authToken = getAuthToken();
    init ??= {};
    init.headers ??= {};
    if (authToken)
      (init.headers as Record<string, string>)["authorization"] = authToken;
    const response = await fetch(API_BASE_URL + path, init);
    const data = await response.json();
    return [data as T, null];
  } catch (error) {
    console.log(error);
    return [null, error];
  }
}

export function getEntries(word: string) {
  return api<Entries>(`/entries/${word}`);
}

interface Entries {
  entries: SerializableEntry[];
  prev: string | null;
  next: string | null;
}