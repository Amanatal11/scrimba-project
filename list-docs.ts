import 'dotenv/config';
import { Langbase } from 'langbase';

const langbase = new Langbase({
    apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
    console.log('Fetching documents...');
    const memoryName = 'knowledge-base';
    const documents = await langbase.memories.documents.list({
        memoryName,
    });

    console.log('Documents:', JSON.stringify(documents, null, 2));
}

main();
