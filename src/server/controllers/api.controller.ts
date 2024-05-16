import { type Request, type Response } from "express";
import entryModel from "$server/models/entry.model.js";

const getWords = async (_: Request, res: Response) => {
  const words = await entryModel.findEntryWords();
  return res.json(words);
};

const getEntryById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const entry = await entryModel.findEntryById(id);
  return res.json(entry);
};

const getNextEntryByWord = async (req: Request, res: Response) => {
  const { word } = req.params;
  const entry = await entryModel.findNextEntryByWord(word);
  return res.json(entry);
};

const getRandomEntryWord = async (_: Request, res: Response) => {
  const entry = await entryModel.findRandomEntry();
  return res.json(entry?.word);
};

const getEntriesByWord = async (req: Request, res: Response) => {
  const word = req.params.word;
  const entries = await entryModel.findEntryByWord(word);
  res.json(entries);
};

const addEntry = async (req: Request, res: Response) => {
  const entry = req.body;
  const insertedId = await entryModel.createEntry(entry);
  res.json(insertedId);
};

const updateEntry = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { id: _, ...entry } = req.body;
  const updateResult = await entryModel.replaceEntry(id, entry);
  res.json(updateResult);
};

const deleteEntry = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deleteResult = await entryModel.deleteEntry(id);
  res.json(deleteResult);
};

export default {
  getWords,
  getEntryById,
  getNextEntryByWord,
  getEntriesByWord,
  getRandomEntryWord,
  addEntry,
  updateEntry,
  deleteEntry,
};