// server/api/openai.ts
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    // Ensure OpenAI API key exists
    if (!config.openAIApiKey) {
        throw createError({
            statusCode: 500,
            statusMessage: "OpenAI API key is not set in runtime config",
        })
    }

    try {
        const response = await $fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${config.openAIApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: body.systemDescription,
                    },
                    {
                        role: "user",
                        content: body.userMessage,
                    },
                ],
            }),
        })

        return response
    } catch (err) {
        // Check if the error is an instance of Error before accessing the message property
        let errorMessage = 'An unknown error occurred'
        
        if (err instanceof Error) {
            errorMessage = err.message
        }

        throw createError({
            statusCode: 500,
            statusMessage: `Failed to fetch from OpenAI: ${errorMessage}`,
        })
    }
})
