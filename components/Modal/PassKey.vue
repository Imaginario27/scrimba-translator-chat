<template>
    <!-- Modal overlay -->
    <div
        v-if="!isValidated"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50"
    >
        <transition name="fade">
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-lg font-bold mb-2">App blocker</h2>
                <p class="text-sm mb-4">Enter the pass key to use this app.</p>
                <form @submit.prevent="handleSubmit">
                    <input
                        v-model="passKey"
                        type="password"
                        placeholder="Pass Key"
                        class="border p-2 mb-4 w-full rounded"
                        required
                    />
                    <button
                        type="submit"
                        class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                    <p
                        v-if="errorMessage"
                        class="text-red-500 mt-2"
                    >
                        {{ errorMessage }}
                    </p>
                </form>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { usePassKeyStore } from "~/stores/usePassKeyStore"
import { storeToRefs } from "pinia";

// States
const passKey = ref("")
const errorMessage = ref("")

// Store
const passKeyStore = usePassKeyStore()
const { validatePassKey } = passKeyStore
const { isValidated } = storeToRefs(passKeyStore)

// Handle form submission
const handleSubmit = async () => {
    await validatePassKey(passKey.value)

    if (!isValidated.value) {
        errorMessage.value = "Invalid pass key. Please try again."
    } else {
        errorMessage.value = ""
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
