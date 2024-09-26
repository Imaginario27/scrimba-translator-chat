export interface OpenAICompletionResponse {
    choices: {
        message: {
            content: string;
        }
    }[]
}