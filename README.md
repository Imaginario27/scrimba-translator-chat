# Translation Chat Web App

Translation Chat is a web-based application that allows users to translate text between Spanish, English, and German with the help of an AI model. The app provides an intuitive user interface where users can select their desired target language and input text for translation.

## Features

- **Language Selection**: Users can choose between Spanish, English, and German for translation.
- **AI-Powered Translations**: The app leverages OpenAI's API to deliver accurate and fast translations.
- **User-Friendly Interface**: The design is built for ease of use with clear prompts and an interactive input field.
- **Security Feature**: The app is originally protected by a screen locker that requires an authorization key every 5 minutes to ensure secure access.

## Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com) - a powerful, modern web development framework.
- **Programming Language**: [TypeScript](https://www.typescriptlang.org) - enhances JavaScript with static typing.
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - a utility-first CSS framework for fast and responsive designs.
- **API Integration**: [OpenAI API](https://platform.openai.com/docs/introduction) - used for the translation logic.
- **State Management**: [Pinia](https://pinia.vuejs.org) - lightweight state management for Vue 3 applications.

## Environment Variables

To run this application, you need to configure the following environment variables:

- **NUXT_PASS_KEY**: Used to protect the application with a screen locker that prompts for authorization every 5 minutes.
- **NUXT_API_SECRET**: Your OpenAI API key, required for making API calls to OpenAI for translation.

Create a `.env` file in the root of your project with the following content:

```bash
NUXT_PASS_KEY=your_protection_key
NUXT_API_SECRET=your_openai_api_key
```

## How to Run the App

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/translation-chat.git
   cd translation-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables as mentioned above in a `.env` file.

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Usage

- Select the target language (Spanish, English, or German) by clicking the respective button.
- Type the text you wish to translate in the input box.
- Press the send button or hit Enter to get the translation.

## Credits

Special thanks to Scrimba AI Career Path for the inspiration and resources that made this project possible.