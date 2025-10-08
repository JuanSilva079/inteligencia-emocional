
import { GoogleGenAI, Type } from "@google/genai";
import type { Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import type { GameState } from "../types";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        scene: { type: Type.STRING },
        choices: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        }
    },
    required: ['scene', 'choices']
};


const parseGameState = (response: GenerateContentResponse): GameState => {
    try {
        const text = response.text.trim();
        const json = JSON.parse(text);

        if (typeof json.scene === 'string' && Array.isArray(json.choices) && json.choices.every((c: any) => typeof c === 'string')) {
            return {
                scene: json.scene,
                choices: json.choices,
            };
        } else {
            throw new Error("Invalid JSON structure for game state.");
        }
    } catch (e) {
        console.error("Failed to parse JSON response:", response.text);
        throw new Error("La respuesta del narrador no tiene un formato válido.");
    }
};

export const initGame = async (): Promise<{ chatInstance: Chat, initialGameState: GameState }> => {
    const chatInstance = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.8,
        }
    });

    const response = await chatInstance.sendMessage({ message: "Comenzar juego." });
    const initialGameState = parseGameState(response);
    
    return { chatInstance, initialGameState };
};

export const makeChoice = async (chat: Chat, choice: string): Promise<GameState> => {
    const response = await chat.sendMessage({ message: choice });
    const newGameState = parseGameState(response);
    return newGameState;
};
