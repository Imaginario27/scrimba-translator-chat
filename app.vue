<template>
    <ModalPassKey v-if="!isValidated" />
    <NuxtLayout>
        <!-- Default template -->
    </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePassKeyStore } from '@/stores/usePassKeyStore'


// Store
const passKeyStore = usePassKeyStore()
const { isValidated, checkLocalValidation } = passKeyStore

onMounted(() => {
    checkLocalValidation()
})
</script>