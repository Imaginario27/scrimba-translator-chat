<template>
    <div class="flex justify-center items-center">
        <p class="text-red-500">{{ message }}</p>
    </div>
</template>

<script setup>
// Props
const props = defineProps({
    message: {
        type: String,
        required: true,
    },
})
</script>