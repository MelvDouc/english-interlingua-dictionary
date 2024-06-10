import type {
  Entry,
  Example,
  PublicUser,
  SerializableEntry,
  Translation,
  UserRole,
  WordClass
} from "$src/common-types.js";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly JWT_SECRET: string;
    }
  }

  namespace Express {
    interface Locals {
      user?: PublicUser;
    }
  }
}

// ===== ===== ===== ===== =====
// DB
// ===== ===== ===== ===== =====

interface User extends PublicUser {
  readonly password: string;
}

// ===== ===== ===== ===== =====
// EXPORTS
// ===== ===== ===== ===== =====

export type {
  Entry,
  Example,
  PublicUser,
  SerializableEntry,
  Translation,
  UserRole,
  User,
  WordClass
};