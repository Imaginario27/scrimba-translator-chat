import { defineStore } from "pinia"
import type { Language } from "@/types/languageType"

export const useLanguageStore = defineStore("language", () => {
    const languages = ref<Language[]>([
        { name: "Spanish", code: "es" },
        { name: "German", code: "de" },
        { name: "English", code: "gb" },
    ])

    // States
    const selectedLanguage = ref<string>("English")

    const setLanguage = (lang: string) => {
        selectedLanguage.value = lang
    }

    return {
        languages,
        selectedLanguage,
        setLanguage,
    }
})
