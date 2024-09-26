export interface Message {
    role: "user" | "system";
    content: string;
    language: string | undefined;
}