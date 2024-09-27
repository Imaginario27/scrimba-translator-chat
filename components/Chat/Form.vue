<template>
    <form @submit.prevent="handleSend" class="relative w-full">
        <div class="relative w-full flex items-end bg-white shadow-sm rounded-lg">
            <textarea
                ref="textarea"
                v-model="userMessage"
                @input="adjustTextareaHeight"
                :placeholder="`Type your message in ${selectedLanguage}...`"
                class="border-none bg-transparent p-4 w-full rounded-md resize-none outline-none max-h-[360px] overflow-y-auto text-sm md:text-base"
                rows="1"
                required
                maxlength="600"
            ></textarea>
            <div class="flex items-end space-x-2 pl-2 pr-4 pb-2.5">
                <button
                    type="submit"
                    class="bg-gray-900 p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                    <IconSend class="h-5 w-5 text-white" />
                </button>

                <button
                    @click="handleReset"
                    type="button"
                    class="bg-red-500 p-2 rounded-full hover:bg-red-400 transition-colors"
                >
                    <IconReset class="h-5 w-5 text-white" />
                </button>
            </div>
        </div>
        <div class="text-right text-gray-500 pr-4 pt-1 text-sm">
            {{ remainingCharacters }} characters left
        </div>
    </form>
</template>

<script setup lang="ts">
// Imports
import { storeToRefs } from "pinia"
import { ref, computed, onMounted } from "vue"
import { useBotStore } from "@/stores/useBotStore"
import { useChatStore } from "@/stores/useChatStore"
import { useLanguageStore } from "@/stores/useLanguageStore"
import { usePassKeyStore } from "@/stores/usePassKeyStore"

// Refs
const textarea = ref<HTMLTextAreaElement | null>(null)

// Stores
const languageStore = useLanguageStore()
const { selectedLanguage } = storeToRefs(languageStore)

const botStore = useBotStore()
const { userMessage, response } = storeToRefs(botStore)
const { generateResponse, welcomeMessage } = botStore

const chatStore = useChatStore()
const { addMessage, resetMessages } = chatStore

// Pass Key Validation Store
const passKeyStore = usePassKeyStore()
const { checkLocalValidation } = passKeyStore
const { isValidated } = storeToRefs(passKeyStore)

// Maximum character limit
const maxLength = 600

// Computed property to get the remaining characters
const remainingCharacters = computed(() => {
    return maxLength - (userMessage.value?.length || 0)
})

// Ensure validation is checked when mounted
onMounted(() => {
    checkLocalValidation()
})

// Function to handle sending the message
const handleSend = async () => {
    if (!isValidated.value) return

    if (!userMessage.value) return

    addMessage("user", userMessage.value)

    await generateResponse(selectedLanguage.value)

    addMessage("system", response.value, selectedLanguage.value)

    userMessage.value = ""

    if (textarea.value) {
        textarea.value.style.height = "auto"
    }
}

// Function to reset the chat, keeping only the welcome message
const handleReset = () => {
    resetMessages(welcomeMessage)
    // Reset the textarea height
    if (textarea.value) {
        textarea.value.style.height = "auto"
    }
}

// Adjust textarea height dynamically based on content
const adjustTextareaHeight = () => {
    if (textarea.value) {
        // Reset the height to recalculate
        textarea.value.style.height = "auto"

        // Calculate new height up to a max height of 400px
        const scrollHeight = textarea.value.scrollHeight
        const maxHeight = 400 // Maximum height

        textarea.value.style.height = `${Math.min(scrollHeight, maxHeight)}px`
    }
}
</script>
