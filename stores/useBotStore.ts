import { defineStore } from "pinia"
import type { OpenAICompletionResponse } from "@/types/openaiType"

export const useBotStore = defineStore("bot", () => {
    const response = ref<string>("")
    const loading = ref<boolean>(false)
    const apiMessage = ref<string>("")
    const userMessage = ref<string>("")

    const welcomeMessage = `Hello! I am here to assist you with translations between Spanish, English, and German. 
    Just select a language, write your text in the box below, and I will translate it for you.`

    const generateResponse = async (language: string) => {
        const systemDescription = `
            You are a highly skilled translation expert specializing in Spanish, English, and German. 
            You understand the nuances, grammar, idiomatic expressions, and cultural contexts of each language. 
            Your translations are accurate, contextually appropriate, and maintain the original meaning while adapting to linguistic differences.
            Translate the following message to ${language}.
        `

        loading.value = true
        apiMessage.value = ""

        try {
            // Send request to Nuxt API route
            const result = await $fetch<OpenAICompletionResponse>('/api/openai', {
                method: 'POST',
                body: {
                    systemDescription,
                    userMessage: userMessage.value,
                },
            })

            // Safely access the response data
            response.value = result.choices[0].message.content
        } catch (err) {
            apiMessage.value = "There was an error generating the response"
            throw new Error(String(err))
        } finally {
            loading.value = false
        }
    }

    return {
        response,
        loading,
        apiMessage,
        userMessage,
        welcomeMessage,
        generateResponse,
    }
})
