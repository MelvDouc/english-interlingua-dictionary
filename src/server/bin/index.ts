import getEntries from "$server/bin/get-entries.js";
import type { Entry } from "$server/types.js";
import chalk from "chalk";
import assert from "node:assert";
import { readFileSync, writeFileSync } from "node:fs";
import YAML from "yaml";

const readyFile = "src/server/data/ready.yml";
main();

async function main() {
  const args = process.argv;

  if (args.includes("--save")) {
    await saveToDatabase();
    return;
  }

  await addInteractive();
}

async function addInteractive() {
  const ready = YAML.parse(readFileSync(readyFile, "utf-8")) as Entry[];
  assert(Array.isArray(ready));

  const entries = await getEntries();
  console.log(`\nAdding entries:\n` + entries.map(({ word }) => "- " + word).join("\n"));

  ready.push(...entries);
  ready.sort((a, b) => a.word.localeCompare(b.word));

  writeFileSync(readyFile, YAML.stringify(ready, null, 2));
  console.log(chalk.green("Entries saved."));
}

async function saveToDatabase() {
  const { closeClient, entryCollection } = await import("$server/core/db.js");

  const docs = YAML.parse(
    readFileSync(readyFile, "utf-8")
  ) as Entry[];
  writeFileSync(readyFile, YAML.stringify([]));
  await entryCollection.insertMany(docs);
  console.log(
    chalk.yellow(`${docs.length} were successfully saved to the database.`)
  );

  await closeClient();
  process.exit(0);
}