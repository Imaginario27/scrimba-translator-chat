<template>
    <div v-if="response" class="flex justify-start">
        <div class="bg-gray-200 text-black p-4 rounded-lg max-w-xs w-full shadow-md">
            <span v-if="language" class="text-xs font-medium">Translated to: {{ language }}</span>
            <div v-html="markdownResponse"></div>
        </div>
    </div>
</template>

<script setup>
// Imports
import { marked } from "marked"
import { computed } from "vue"

// Props
const props = defineProps({
    response: {
        type: String,
        default: null,
    },
    language: String | null,
})

// Convert markdown to HTML
const markdownResponse = computed(() => {
    return marked(props.response || "")
})
</script>