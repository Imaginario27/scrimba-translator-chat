import { defineStore } from 'pinia'

export const usePassKeyStore = defineStore('passKey', () => {
    const isValidated = ref<boolean>(false)

    const CACHE_KEY = 'passKeyValidation'
    const CACHE_EXPIRATION_TIME = 5 * 60 * 1000 // 5 minutes in milliseconds

    // Validate the pass key by fetching from the server
    const validatePassKey = async (passKey: string) => {
        const response = await $fetch('/api/validate-passkey', {
            method: 'POST',
            body: { passKey },
        })

        if (response.success) {
            // Save validation status in Cache Storage
            const cacheStorage = await caches.open(CACHE_KEY)
            const validationData = new Response(JSON.stringify({
                validated: true,
                timestamp: Date.now(),
            }))
            cacheStorage.put(CACHE_KEY, validationData)

            // Mark as validated in Pinia store
            isValidated.value = true
        } else {
            isValidated.value = false
        }
    }

    // Check local cache storage for validation status
    const checkLocalValidation = async () => {
        const cacheStorage = await caches.open(CACHE_KEY)
        const cacheData = await cacheStorage.match(CACHE_KEY)

        if (cacheData) {
            const { validated, timestamp } = await cacheData.json()

            // Check if the cache has expired (5 minutes expiration)
            if (validated && (Date.now() - timestamp < CACHE_EXPIRATION_TIME)) {
                isValidated.value = true
            } else {
                // If the cache is expired, clear it
                await cacheStorage.delete(CACHE_KEY)
                isValidated.value = false
            }
        } else {
            isValidated.value = false
        }
    }

    return { 
        isValidated, 
        validatePassKey, 
        checkLocalValidation 
    }
})
