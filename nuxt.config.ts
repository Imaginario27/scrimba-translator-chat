// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-09-26",
    devtools: { enabled: false },
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
    ssr: false, 
    runtimeConfig: {
        openAIApiKey: process.env.NUXT_API_SECRET, 
        passKey: process.env.NUXT_PASS_KEY,
    },
    app: {
        head: {
            htmlAttrs: {
                lang: "en",
            },
            link: [
                {
                    href: "https://cdn.jsdelivr.net/gh/lipis/flag-icons/css/flag-icons.min.css",
                    rel: "stylesheet",
                },
            ],
            meta: [
                {
                    name: "viewport",
                    content:
                        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
                },
            ],
        },
    },
})