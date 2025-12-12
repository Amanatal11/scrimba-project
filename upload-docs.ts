import 'dotenv/config';
import { Langbase } from 'langbase';
import { readFile } from 'fs/promises';
import path from 'path';

const langbase = new Langbase({
  apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
  const memoryName = 'knowledge-base';
  const filePath = path.join(process.cwd(), 'docs', 'langbase-faq.txt');
  const fileContent = await readFile(filePath);

  await langbase.memories.documents.upload({
    memoryName,
    documentName: 'langbase-faq.txt',
    document: fileContent,
    contentType: 'text/plain',
  });

  console.log('Document uploaded successfully');
}

main();