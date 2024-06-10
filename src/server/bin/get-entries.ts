import chalk from "chalk";
import WORD_CLASSES from "$src/word-classes.js";
import scanner from "$server/bin/scanner.js";
import type { Entry, WordClass, Example, Translation } from "$server/types.js";

export default async function getEntries() {
  const entries: Entry[] = [];

  for await (const entry of promptEntry()) {
    entries.push(entry);
    console.log(`\nAdded entry for ${chalk.yellow(entry.word)}.\n`);
  }

  scanner.close();
  return entries;
}

async function* promptEntry() {
  while (true) {
    const word = await scanner.question("Entry: ");
    if (!word) break;

    const entry: Entry = {
      word,
      classes: {}
    };

    for await (const wordClass of promptWordClass()) {
      const translations: Translation[] = [];
      for await (const translation of promptTranslation())
        translations.push(translation);
      entry.classes[wordClass] = translations;
    }

    yield entry;
  }
}

async function* promptWordClass() {
  const usedClasses = new Set<WordClass>();

  while (usedClasses.size < WORD_CLASSES.length) {
    const wordClass = await scanner.question(`┌ Add word class (? for options): `) as WordClass | "?";

    if (!wordClass) {
      if (usedClasses.size > 0) break;
      console.log("At least one word class is required.");
      continue;
    }

    if (wordClass === "?") {
      console.log(WORD_CLASSES.map((cls) => `- ${cls}`).join("\n"));
      continue;
    }

    if (!WORD_CLASSES.includes(wordClass)) {
      console.log(`Invalid word class "${wordClass}".`);
      continue;
    }

    if (usedClasses.has(wordClass)) {
      console.log(`A translation for word class "${wordClass}" is already defined.`);
      continue;
    }

    usedClasses.add(wordClass);
    yield wordClass as WordClass;
  }
}

async function* promptTranslation() {
  for await (const translationText of promptTranslationText()) {
    const translation: Translation = {
      translation: translationText
    };

    const detail = await scanner.question("├─ Detail (optional): ");
    detail && (translation.detail = detail);

    const examples: Example[] = [];
    for await (const example of promptExample())
      examples.push(example);
    examples.length && (translation.examples = examples);

    yield translation;
  }
}

async function* promptTranslationText() {
  let count = 0;

  while (true) {
    const text = await scanner.question("├─ Translation: ");

    if (!text) {
      if (count > 0) break;
      console.log("At least one translation is required.");
      continue;
    }

    count++;
    yield text;
  }
}

async function* promptExample() {
  let text: string;

  while (text = await scanner.question("└─ Example (optional): ")) {
    let translation = "";

    while (!translation) {
      translation = await scanner.question("└─── Example translation: ");
      if (!translation)
        console.log("Example translation is required.");
    }

    yield { example: text, translation };
  }
}