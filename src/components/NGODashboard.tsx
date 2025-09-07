// src/components/NGODashboard.tsx

import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useToast } from '@/hooks/use-toast';
import DashboardHeader from './DashboardHeader';
import { Chatbot } from '@/components/Chatbot';
import { BackgroundBeams } from "@/components/ui/background-beams";

// --- Gemini API Configuration ---
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI;
let model;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `You are VerifiAI, an expert assistant for the Indian National Registry for Blue Carbon. Your goal is to guide a new user through the project submission process. You must be friendly, professional, and strictly follow the guidelines of the Indian Ministry of Environment, Forest and Climate Change (MoEFCC). Guide the user one phase at a time, waiting for their response before proceeding. When a user uploads a file, acknowledge it by name and confirm you have attached it to their project file. Then, prompt them for the next action.`,
    });
} else {
    console.error("VITE_GEMINI_API_KEY is not set. The chatbot will not function. Please create a .env file in the project root and add VITE_GEMINI_API_KEY=YOUR_KEY_HERE, then restart the development server.");
}

// --- Type Definitions ---
type Message = { id: number; text: string; sender: 'user' | 'ai'; };
type GeminiHistoryItem = { role: 'user' | 'model'; parts: { text: string }[] };

// --- Main Dashboard Component ---
const NGODashboard = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isAiTyping, setIsAiTyping] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        setMessages([
            {
                id: 1,
                text: "Welcome! I am VerifiAI. To begin, tell me the official name of your blue carbon project, or choose a suggestion below.",
                sender: 'ai',
            },
        ]);
    }, []);

    const handleSendMessage = async (userInput: string) => {
        // This function remains the same as before
        if (!API_KEY) {
            toast({
                title: "API Key Not Configured",
                description: "The application is missing the Gemini API key. Please contact the administrator.",
                variant: "destructive",
            });
            return;
        }

        const userMessage: Message = { id: Date.now(), text: userInput, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setIsAiTyping(true);

        try {
            const historyForApi: GeminiHistoryItem[] = [...messages, userMessage].map(msg => ({
                role: msg.sender === 'ai' ? 'model' : 'user',
                parts: [{ text: msg.text }],
            }));

            if (historyForApi.length > 0 && historyForApi[0].role === 'model') {
                historyForApi.shift();
            }
            historyForApi.pop();

            const chat = model.startChat({ history: historyForApi });
            const result = await chat.sendMessage(userInput);
            const response = result.response;
            const aiResponseText = response.text();

            const aiMessage: Message = { id: Date.now() + 1, text: aiResponseText, sender: 'ai' };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("Gemini API error:", error);
            toast({
                title: "AI Error",
                description: "Could not get a response from the AI. This may be due to an invalid API key or network issue.",
                variant: "destructive",
            });
             setMessages(prev => [...prev, {id: Date.now(), text: "Sorry, I encountered an error and couldn't get a response.", sender: 'ai'}]);
        } finally {
            setIsAiTyping(false);
        }
    };

    // ## ADD THIS NEW FUNCTION TO HANDLE FILE UPLOADS ##
    const handleFileUpload = (file: File) => {
        // 1. Add a confirmation message to the chat from the user
        const userMessage: Message = {
            id: Date.now(),
            text: `File Uploaded: **${file.name}** (${(file.size / 1024).toFixed(2)} KB)`,
            sender: 'user',
        };
        setMessages(prev => [...prev, userMessage]);
        
        // 2. Simulate the AI responding after a short delay
        setIsAiTyping(true);
        setTimeout(() => {
            const aiResponse: Message = {
                id: Date.now() + 1,
                text: `Thank you for uploading **${file.name}**. I have attached it to your project file.

Please upload the next document, or let me know if you have any questions.`,
                sender: 'ai',
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsAiTyping(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full bg-neutral-950 relative antialiased">
            <div className="relative z-10 w-full">
                <DashboardHeader
                    title="NGO Project Portal"
                    subtitle="Submit your project details using our AI assistant below."
                />
                <main className="max-w-5xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8">
                    <Chatbot
                        messages={messages}
                        isAiTyping={isAiTyping}
                        onSendMessage={handleSendMessage}
                        // ## PASS THE NEW FUNCTION AS A PROP ##
                        onFileUpload={handleFileUpload}
                    />
                </main>
            </div>
            <BackgroundBeams />
        </div>
    );
};

export default NGODashboard;