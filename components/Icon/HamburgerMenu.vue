<template>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" :class="class">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
</template>

<script setup>
// Props
const props = defineProps({
    class: String,
})
</script>
