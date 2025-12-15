import 'dotenv/config';
import { Langbase } from 'langbase';

const langbase = new Langbase({
    apiKey: process.env.LANGBASE_API_KEY!,
});

async function main() {
    // 1. Create or Update a Pipe connected to our memory
    // We use upsert: true so it creates it if it doesn't exist, or updates it if it does.
    const pipeName = 'ask-docs-pipe';
    const memoryName = 'knowledge-base';

    console.log(`Ensuring pipe "${pipeName}" exists and is connected to "${memoryName}"...`);

    await langbase.pipes.create({
        name: pipeName,
        upsert: true,
        memory: [{ name: memoryName }],
        model: 'openai:gpt-4o-mini', // Using a fast, efficient model
    });

    // 2. Ask a question
    const question = 'What is Langbase?';
    console.log(`Asking: "${question}"`);

    const stream = await langbase.pipes.run({
        name: pipeName,
        messages: [{ role: 'user', content: question }],
        // Enable streaming for real-time response
        stream: true,
    });

    // 3. Stream the response
    console.log('Response:');
    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
            process.stdout.write(content);
        }
    }
    process.stdout.write('\n');
}

main();
