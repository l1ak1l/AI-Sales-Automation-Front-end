'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

export default function VoiceDemoPage() {
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState<{ type: 'user' | 'ai'; text: string }[]>([])

  // Dummy function to simulate voice input
  const simulateVoiceInput = () => {
    const dummyTexts = [
      "Hello, how can you assist me today?",
      "What's the weather like?",
      "Tell me a joke.",
      "What are your capabilities?",
      "Thank you for your help."
    ]
    return dummyTexts[Math.floor(Math.random() * dummyTexts.length)]
  }

  // Dummy function to simulate AI response
  const simulateAiResponse = (input: string) => {
    const responses: {[key: string]: string} = {
      "Hello, how can you assist me today?": "Hello! I'm here to help you with any questions or tasks you may have. How can I assist you today?",
      "What's the weather like?": "I'm sorry, I don't have access to real-time weather information. You might want to check a weather app or website for the most up-to-date forecast.",
      "Tell me a joke.": "Why don't scientists trust atoms? Because they make up everything!",
      "What are your capabilities?": "As an AI language model, I can assist with a wide range of tasks including answering questions, providing explanations, offering suggestions, and helping with various types of analysis and problem-solving.",
      "Thank you for your help.": "You're welcome! I'm glad I could assist you. If you have any more questions, feel free to ask."
    }
    return responses[input] || "I'm sorry, I didn't understand that. Could you please rephrase your question?"
  }

  const startListening = () => {
    setIsListening(true)
    // Simulate voice input after a short delay
    setTimeout(() => {
      const text = simulateVoiceInput()
      setMessages(prev => [...prev, { type: 'user', text }])
      // Simulate AI response
      setTimeout(() => {
        const response = simulateAiResponse(text)
        setMessages(prev => [...prev, { type: 'ai', text: response }])
        setIsListening(false)
      }, 1000)
    }, 1000)
  }

  const stopListening = () => {
    setIsListening(false)
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <motion.div
            className="w-64 h-64 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
            animate={{
              scale: isListening ? [1, 1.1, 1] : 1,
              opacity: isListening ? [0.7, 1, 0.7] : 0.7,
            }}
            transition={{
              duration: 1.5,
              repeat: isListening ? Infinity : 0,
              repeatType: "reverse",
            }}
          />

          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 mb-8 h-64 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.type === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={startListening}
              disabled={isListening}
              className="bg-blue-500 bg-opacity-50 backdrop-filter backdrop-blur-lg text-white rounded-xl px-6 py-2 hover:bg-blue-600 transition-colors duration-300"
            >
              Start
            </Button>
            <Button
              onClick={stopListening}
              disabled={!isListening}
              className="bg-red-500 bg-opacity-50 backdrop-filter backdrop-blur-lg text-white rounded-xl px-6 py-2 hover:bg-red-600 transition-colors duration-300"
            >
              Stop
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
