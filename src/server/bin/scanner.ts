import { createInterface } from "node:readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string) => {
  return new Promise<string>((resolve) => {
    rl.question(query, resolve);
  });
};

const close = () => rl.close();

export default {
  question,
  close
};