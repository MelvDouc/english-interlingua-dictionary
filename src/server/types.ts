import type {
  Entry,
  Example,
  PublicUser,
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
  Translation,
  UserRole,
  User,
  WordClass
};