// Frontend Code (voice-demo-page.tsx)
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

export default function VoiceDemoPage() {
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState<{ type: 'user' | 'ai'; text: string }[]>([])
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  let recognition: SpeechRecognition | null = null
  let finalTranscript = ''

  const startRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.')
      return
    }

    recognition = new (window as any).webkitSpeechRecognition()
    recognition.interimResults = true

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      finalTranscript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('')
    }

    recognition.onspeechend = () => {
      recognition?.stop();
      stopListening()
      const userMessage = finalTranscript.trim();
      if (userMessage) {
        setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    
        fetch('http://127.0.0.1:8000/transcription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: userMessage }),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Server response:', data);
    
            const serverMessage = data.message || 'No response from server.';
            setMessages(prev => [...prev, { type: 'ai', text: serverMessage }]);
    
            if (data.audio_url) {
              // Add timestamp to avoid browser caching
              const timestampedUrl = `${data.audio_url}?t=${Date.now()}`;
              setAudioUrl(timestampedUrl);
    
              // Create new audio element each time
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = timestampedUrl;
                audioRef.current.load();
                audioRef.current.play().catch(err => console.error('Audio playback error:', err));
              } else {
                const newAudio = new Audio(timestampedUrl);
                audioRef.current = newAudio;
                newAudio.play().catch(err => console.error('Audio playback error:', err));
              }
            }
          })
          .catch(error => {
            console.error('Error sending transcription:', error);
            setMessages(prev => [...prev, { type: 'ai', text: 'Error communicating with server.' }]);
          });
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error)
    }

    recognition.start()
    setIsListening(true)
  }

  const stopListening = () => {
    if (recognition) {
      recognition.stop()
    }
    setIsListening(false)
  }

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

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
              repeatType: 'reverse',
            }}
          />
          <div
            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 mb-8 h-64 overflow-y-auto"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}
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
            <div ref={messagesEndRef} />
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={startRecognition}
              disabled={isListening}
              className="bg-blue-500 bg-opacity-50 backdrop-filter backdrop-blur-lg text-white rounded-xl px-6 py-2 hover:bg-blue-600 transition-colors duration-300"
            >
              Start
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}