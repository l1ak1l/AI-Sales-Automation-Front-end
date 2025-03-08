"use client"
import { useState } from "react"
import { CardSpotlightComponent } from "@/components/card-spotlight"
import { WavyBackground } from "@/components/ui/wavy-background"
import { TypedTextEffect } from "@/components/ui/typed-text-effect"
import { Briefcase, CheckSquare, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [completedLines, setCompletedLines] = useState<string[]>([])
  const lines = ["Reach your customers.", "Wherever. Whenever."]

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden w-full">
      <WavyBackground className="min-h-screen pb-40">
        <div className="container mx-full px-4">
          <div className="flex flex-col items-center justify-center min-h-screen text-center pt-16">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight mix-blend-difference space-y-4">
              {/* First line */}
              <div>
                {completedLines.includes(lines[0]) ? (
                  <span className="inline-block">{lines[0]}</span>
                ) : (
                  <TypedTextEffect
                    strings={[lines[0]]}
                    className="inline-block"
                    speed={50}
                    onComplete={() => setCompletedLines((prev) => [...prev, lines[0]])}
                  />
                )}
              </div>

              {/* Second line */}
              <div>
                {completedLines.includes(lines[0]) &&
                  (completedLines.includes(lines[1]) ? (
                    <span className="inline-block">{lines[1]}</span>
                  ) : (
                    <TypedTextEffect
                      strings={[lines[1]]}
                      className="inline-block"
                      speed={50}
                      onComplete={() => setCompletedLines((prev) => [...prev, lines[1]])}
                    />
                  ))}
              </div>
            </div>
            <p className="text-xl md:text-2xl mb-12 mix-blend-difference">AI-powered voice agents for your business</p>
            <Link href="/demo">
              <Button
                size="lg"
                className="bg-purple-600 text-white hover:bg-purple-700 rounded-full px-10 py-6 text-xl transition-all hover:shadow-lg"
              >
                Get Started
              </Button>
            </Link>
          </div>

          <section className="py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <CardSpotlightComponent
                title="Inbound Sales Agent"
                description="Instantly deploy the Inbound Sales Agent on your contact or pricing pages, trained on millions of hours of sales calls."
                icon={Briefcase}
              />
              <CardSpotlightComponent
                title="Survey Agent"
                description="Engage customers with the Survey Agent, offering quick feedback through natural conversation."
                icon={CheckSquare}
              />
              <CardSpotlightComponent
                title="Customer Satisfaction Agent"
                description="The Customer Satisfaction Survey Agent helps you gather real-time feedback and insights."
                icon={Heart}
              />
            </div>
          </section>
        </div>
      </WavyBackground>

      <main className="container mx-auto px-4">
        <section className="py-24">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12">Ready to get started?</h2>
            <Link href="/demo">
              <Button
                size="lg"
                className="bg-purple-600 text-white hover:bg-purple-700 rounded-full px-10 py-6 text-xl transition-all hover:shadow-lg"
              >
                Book a Demo
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="font-bold text-2xl mb-6">VoiceAgents</h3>
              <p className="text-gray-400 text-lg">AI-powered voice agents for your business</p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-6">Product</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-lg">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-lg">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-lg">
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-6">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-lg">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-lg">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-lg">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-6">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-lg">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-lg">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white text-lg">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p className="text-lg">&copy; {new Date().getFullYear()} VoiceAgents. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

