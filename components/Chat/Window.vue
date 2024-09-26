<template>
    <div ref="chatContainer" class="flex-1 w-full overflow-y-auto bg-white shadow-md rounded-lg p-6 space-y-4">
        <div v-for="(message, index) in messages" :key="index">
            <ChatBubbleUser 
                v-if="message.role === 'user'" 
                :message="message.content" 
            />
            <ChatBubbleSystem 
                v-if="message.role === 'system'" 
                :response="message.content" 
                :language="index === 0 ? null : message.language"
            />
        </div>
        <ChatLoading 
            v-if="loading" 
            message="Translating message, please wait..." />
        <ChatApiMessage 
            v-if="apiMessage" 
            :message="apiMessage" 
        />
    </div>
    <ChatForm />
</template>

<script setup lang="ts">
// Imports
import { storeToRefs } from 'pinia'
import { useBotStore } from '@/stores/useBotStore' 
import { useChatStore } from '@/stores/useChatStore'
import { useRuntimeConfig } from '#imports'
import { onMounted, nextTick, ref } from 'vue'

// Runtime config
const config = useRuntimeConfig()

// Stores
const botStore = useBotStore()
const { loading, apiMessage } = storeToRefs(botStore)
const { welcomeMessage } = botStore

const chatStore = useChatStore()
const { messages } = storeToRefs(chatStore)
const { addWelcomeMessage } = chatStore

// Reference to the chat container for scrolling
const chatContainer = ref<HTMLElement | null>(null)

// Add welcome message when the component is mounted
onMounted(() => {
    addWelcomeMessage(welcomeMessage)
    scrollToBottom() 
})

// Function to scroll the chat container to the bottom
const scrollToBottom = () => {
    if (chatContainer.value) {
        nextTick(() => {
            chatContainer.value!.scrollTop = chatContainer.value!.scrollHeight
        })
    }
}
</script>
