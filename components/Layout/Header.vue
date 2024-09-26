<template>
    <header
        class="bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-4 px-8 shadow-md flex justify-between items-center"
    >
        <h1 class="text-2xl font-bold">Translation Chat</h1>

        <!-- Desktop Language Selector -->
        <div class="hidden md:flex space-x-4">
            <button
                v-for="lang in languages"
                :key="lang.name"
                :class="{
                    'bg-white text-indigo-700 border border-indigo-600':
                        selectedLanguage === lang.name,
                    'bg-indigo-500 text-white hover:bg-indigo-400':
                        selectedLanguage !== lang.name,
                }"
                class="font-bold py-2 px-4 rounded-full transition-colors shadow flex items-center space-x-2"
                @click="setLanguage(lang.name)"
            >
                <!-- Flag Icon -->
                <span :class="`fi fi-${lang.code}`"></span>
                <!-- Language Name -->
                <span>{{ lang.name }}</span>
            </button>
        </div>

        <!-- Mobile Menu (Hamburger Icon) -->
        <div class="md:hidden">
            <button
                @click="toggleMobileMenu"
                class="focus:outline-none"
            >
                <IconHamburgerMenu class="w-8 h-8" />
            </button>
        </div>

        <!-- Mobile Menu Dropdown -->
        <div
            v-if="isMobileMenuOpen"
            class="absolute top-16 left-0 w-full bg-white text-indigo-700 shadow-lg z-50"
        >
            <div class="flex flex-col space-y-4 py-4 px-8">
                <button
                    v-for="lang in languages"
                    :key="lang.name"
                    :class="{
                        'bg-indigo-100 text-indigo-700':
                            selectedLanguage === lang.name,
                        'hover:bg-indigo-500 hover:text-white':
                            selectedLanguage !== lang.name,
                    }"
                    class="flex py-2 px-4 rounded-full text-center space-x-2"
                    @click="setLanguage(lang.name)"
                >
                    <!-- Flag Icon -->
                    <span :class="`fi fi-${lang.code}`"></span>
                    <!-- Language Name -->
                    <span>{{ lang.name }}</span>
                </button>
            </div>
        </div>
    </header>
</template>

<script setup>
// Imports
import { ref, onMounted, onBeforeUnmount } from "vue"
import { storeToRefs } from "pinia"

// State to manage mobile menu visibility
const isMobileMenuOpen = ref(false)

// Toggle mobile menu
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu if the window size is larger than 768px
const handleResize = () => {
    if (window.innerWidth >= 768) {
        isMobileMenuOpen.value = false
    }
}

// Set up the resize listener
onMounted(() => {
    window.addEventListener('resize', handleResize)
})

// Clean up the resize listener on unmount
onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})

// Stores
const languageStore = useLanguageStore()
const { languages, selectedLanguage } = storeToRefs(languageStore)
const { setLanguage } = languageStore
</script>

<style scoped>
.fi {
    font-size: 1.2em;
    /* Adjust flag size */
}
</style>
