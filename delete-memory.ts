import 'dotenv/config';
import { Langbase } from 'langbase';

const langbase = new Langbase({
    apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
    const memoryName = 'knowledge-base';
    try {
        await langbase.memories.delete({ name: memoryName });
        console.log(`Memory '${memoryName}' deleted successfully.`);
    } catch (error) {
        console.error(`Failed to delete memory '${memoryName}':`, error);
    }
}

main();
