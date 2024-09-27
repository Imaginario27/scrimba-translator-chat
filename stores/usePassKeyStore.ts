import { defineStore } from 'pinia'

export const usePassKeyStore = defineStore('passKey', () => {
    const isValidated = ref<boolean>(false)

    const CACHE_KEY = 'passKeyValidation'
    const CACHE_EXPIRATION_TIME = 5 * 60 * 1000 // 5 minutes in milliseconds

    let cacheTimeout: ReturnType<typeof setTimeout> | null = null

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

            // Set up auto-invalidation after cache expiration
            setAutoInvalidate(CACHE_EXPIRATION_TIME)
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
            const remainingTime = CACHE_EXPIRATION_TIME - (Date.now() - timestamp)
            if (validated && remainingTime > 0) {
                isValidated.value = true
                // Set up auto-invalidation after the remaining cache expiration time
                setAutoInvalidate(remainingTime)
            } else {
                // If the cache is expired, clear it
                await cacheStorage.delete(CACHE_KEY)
                isValidated.value = false
            }
        } else {
            isValidated.value = false
        }
    }

    // Automatically invalidate the cache after expiration time
    const setAutoInvalidate = (timeout: number) => {
        if (cacheTimeout) clearTimeout(cacheTimeout)

        cacheTimeout = setTimeout(async () => {
            const cacheStorage = await caches.open(CACHE_KEY)
            await cacheStorage.delete(CACHE_KEY)
            isValidated.value = false
        }, timeout)
    }

    return { 
        isValidated, 
        validatePassKey, 
        checkLocalValidation 
    }
})
