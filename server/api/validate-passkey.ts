export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    // Check if the pass key matches the one in the env variable
    if (body.passKey === config.passKey) {
        return { success: true }
    } else {
        return { success: false }
    }
})