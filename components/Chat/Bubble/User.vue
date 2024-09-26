<template>
    <div v-if="message" class="flex justify-end">
        <div class="bg-blue-500 text-white p-4 rounded-lg max-w-xs w-full shadow-md">
            {{ message }}
        </div>
    </div>
</template>

<script setup>
// Props
const props = defineProps({
    message: {
        type: String,
        default: null,
    },
})
</script>