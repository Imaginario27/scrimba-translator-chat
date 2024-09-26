import { defineStore } from "pinia"
import type { Message } from "@/types/chatType"


export const useChatStore = defineStore("chat", () => {
    const messages = ref<Message[]>([])

    const addMessage = (role: "user" | "system", content: string, language?: string) => {
        messages.value.push({ role, content, language })
    }

    const addWelcomeMessage = (welcomeMessage: string) => {
        if (!messages.value.length) { 
            addMessage("system", welcomeMessage)
        }
    }

    const resetMessages = (welcomeMessage: string) => {
        messages.value = [{ role: "system", content: welcomeMessage, language: "English" }]
    }

    return {
        messages,
        addMessage,
        addWelcomeMessage,
        resetMessages,
    }
})
