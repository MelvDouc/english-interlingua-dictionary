import type {
  Entry,
  Example,
  PublicUser,
  Translation,
  UserRole,
  WordClass
} from "$src/common-types.js";
import { type obs } from "reactfree-jsx";

type Obs<T> = ReturnType<typeof obs<T>>;
type SafeResponse<T, Err> = [T, null] | [null, Err];

// ===== ===== ===== ===== =====
// ENTITY
// ===== ===== ===== ===== =====

interface SerializableEntry extends Entry {
  readonly id: string;
}

// ===== ===== ===== ===== =====
// EXPORTS
// ===== ===== ===== ===== =====

export type {
  Entry,
  Example,
  Obs,
  PublicUser,
  SafeResponse,
  SerializableEntry,
  Translation,
  UserRole,
  WordClass
};
