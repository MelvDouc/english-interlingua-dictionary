import { z } from "zod";
import { entryCollection, ObjectId, type WithId } from "$server/core/db.js";
import type { Entry, SerializableEntry } from "$server/types.js";

const exampleSchema = z
  .object({
    example: z.string().min(1),
    translation: z.string().min(1)
  })
  .strict();
const translationSchema = z
  .object({
    translation: z.string().min(1),
    pronunciation: z.string().optional(),
    detail: z.string().optional(),
    examples: z.array(exampleSchema).optional()
  })
  .strict();
const entrySchema = z.object({
  word: z.string().min(1),
  classes: z.record(z.array(translationSchema))
});

function findEntryWords() {
  return entryCollection.distinct("word", {}, {
    collation: { locale: "en" }
  });
}

async function findEntriesByWord(word: string) {
  const entries = await entryCollection
    .find({ word })
    .map(makeEntrySerializable)
    .toArray();
  const words = (await findEntryWords());
  const index = words.indexOf(word);
  const prev = index > 0 ? words[index - 1] : null;
  const next = index < words.length - 1 && index !== -1 ? words[index + 1] : null;
  return { entries, prev, next };
}

async function findEntryById(id: string) {
  try {
    const entity = await entryCollection.findOne({ _id: new ObjectId(id) });
    return entity
      ? makeEntrySerializable(entity)
      : null;
  } catch (error) {
    return null;
  }
}

function findRandomEntry() {
  return entryCollection
    .aggregate([
      {
        $sample: { size: 1 }
      }
    ])
    .tryNext();
}

async function createEntry(entry: Entry) {
  try {
    const doc = entrySchema.parse(entry);
    const { acknowledged, insertedId } = await entryCollection.insertOne(doc);
    return acknowledged
      ? insertedId.toHexString()
      : null;
  } catch (error) {
    return null;
  }
}

async function replaceEntry(id: string, entry: Entry) {
  try {
    const replacement = entrySchema.parse(entry);
    const updateResult = await entryCollection.replaceOne({ _id: new ObjectId(id) }, replacement);
    return updateResult.acknowledged === true;
  } catch (error) {
    return false;
  }
}

async function deleteEntry(id: string) {
  try {
    const deleteResult = await entryCollection.deleteOne({ _id: new ObjectId(id) });
    return deleteResult.acknowledged === true;
  } catch (error) {
    return false;
  }
}

function makeEntrySerializable({ _id, ...entry }: WithId<Entry>): SerializableEntry {
  return { ...entry, id: _id.toHexString() };
}

export default {
  findEntryWords,
  findEntriesByWord,
  findRandomEntry,
  findEntryById,
  createEntry,
  replaceEntry,
  deleteEntry,
};