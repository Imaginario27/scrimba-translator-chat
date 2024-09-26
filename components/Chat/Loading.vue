<template>
    <div class="flex justify-center items-center">
        <p class="text-gray-500">
            {{ message }}
        </p>
    </div>
</template>

<script setup>
// Props 
const props = defineProps({
    message: {
        type: String,
        default: 'Loading...',
    },
});
    
</script>