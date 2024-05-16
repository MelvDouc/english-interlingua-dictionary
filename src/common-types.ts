import WORD_CLASSES from "$src/word-classes.js";

// ===== ===== ===== ===== =====
// AUTH
// ===== ===== ===== ===== =====

type UserRole = "USER" | "MODERATOR" | "ADMIN";

interface PublicUser {
  readonly email: string;
  readonly role: UserRole;
}

// ===== ===== ===== ===== =====
// ENTRY
// ===== ===== ===== ===== =====

type WordClass = typeof WORD_CLASSES[number];

interface Example {
  example: string;
  translation: string;
}

interface Translation {
  translation: string;
  pronunciation?: string;
  detail?: string;
  examples?: Example[];
}

interface Entry {
  word: string;
  readonly classes: {
    [K in WordClass]?: Translation[]
  };
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
  WordClass
};