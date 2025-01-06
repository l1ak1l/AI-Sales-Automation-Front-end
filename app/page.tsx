'use client'

import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, CheckSquare, Heart } from 'lucide-react'
import { Navbar } from "@/components/navbar"
import Typed from 'typed.js'

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const typedRef1 = useRef<HTMLSpanElement>(null)
  const typedRef2 = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const typed1 = new Typed(typedRef1.current, {
      strings: ['Reach your customers.'],
      typeSpeed: 50,
      showCursor: false,
      onComplete: (self) => {
        // Start the second animation when the first one completes
        const typed2 = new Typed(typedRef2.current, {
          strings: ['Wherever. Whenever.'],
          typeSpeed: 50,
          showCursor: false,
        })
      }
    })

    return () => {
      typed1.destroy()
    }
  }, [])

  const gradientStyles = [
    {
      background: '#F8F8F8'
    },
    {
      background: 'radial-gradient(circle at center, rgba(0, 255, 136, 0.3), rgba(248, 248, 248, 0) 70%), #F8F8F8'
    },
    {
      background: 'radial-gradient(circle at center, rgba(66, 153, 225, 0.3), rgba(248, 248, 248, 0) 70%), #F8F8F8'
    },
    {
      background: 'radial-gradient(circle at center, rgba(255, 159, 64, 0.3), rgba(248, 248, 248, 0) 70%), #F8F8F8'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navbar />

      <main className="relative pt-16">
        <section
          ref={el => {sectionsRef.current[0] = el}}
          className="min-h-[70vh] flex items-center justify-center relative"
          style={gradientStyles[0]}
        >
          <div className="container px-4 py-32 text-center">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-8">
              <span ref={typedRef1} className="block mb-4"></span>
              <span ref={typedRef2} className="block"></span>
            </h1>
            <Link href="/demo">
              <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 rounded-full px-8 transition-all hover:shadow-lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        <section
          ref={el => {sectionsRef.current[1] = el}}
          className="min-h-[70vh] flex items-center justify-center relative transition-all duration-500"
          style={{
            ...gradientStyles[activeSection === 1 ? 1 : 0],
          }}
        >
          <div className="container px-4 py-32 text-center max-w-4xl mx-auto">
            <Briefcase className="w-16 h-16 mx-auto mb-6 text-gray-900" />
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Inbound Sales Agent</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 mb-6">
              Effortlessly qualify leads.
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Instantly deploy the Inbound Sales Agent on your contact or pricing pages,{' '}
              <span className="font-semibold">trained on millions of hours of sales calls</span>. No
              forms—just seamless, direct engagement.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <span className="text-gray-900 font-medium">Experience it for yourself.</span>
              <Button 
                className="bg-blue-500 text-white hover:bg-blue-600 rounded-full px-8 py-2 transition-all hover:shadow-lg"
              >
                Talk
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section
          ref={el => {sectionsRef.current[2] = el}}
          className="min-h-[70vh] flex items-center justify-center relative transition-all duration-500"
          style={{
            ...gradientStyles[activeSection === 2 ? 2 : 1],
          }}
        >
          <div className="container px-4 py-32 text-center max-w-4xl mx-auto">
            <CheckSquare className="w-16 h-16 mx-auto mb-6 text-gray-900" />
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Survey Agent</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 mb-6">
              Collect insights more naturally.
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Engage customers with the Survey Agent, offering quick feedback through natural conversation.{' '}
              <span className="font-semibold">Boost response rates with conversational interactions</span>,
              while gaining real-time insights for faster decision-making.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <span className="text-gray-900 font-medium">Experience it for yourself.</span>
              <Button 
                className="bg-blue-500 text-white hover:bg-blue-600 rounded-full px-8 py-2 transition-all hover:shadow-lg"
              >
                Talk
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section
          ref={el => {sectionsRef.current[3] = el}}
          className="min-h-[70vh] flex items-center justify-center relative transition-all duration-500"
          style={{
            ...gradientStyles[activeSection === 3 ? 3 : 2],
          }}
        >
          <div className="container px-4 py-32 text-center max-w-4xl mx-auto">
            <Heart className="w-16 h-16 mx-auto mb-6 text-gray-900" />
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Customer Satisfaction Agent</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 mb-6">
              Receive 24/7 customer insights.
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              The Customer Satisfaction Survey Agent helps you{' '}
              <span className="font-semibold">gather real-time feedback and insights</span>. Deliver
              personalized surveys that capture the voice of your customers, ensuring you stay ahead of
              their needs.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <span className="text-gray-900 font-medium">Experience it for yourself.</span>
              <Button 
                className="bg-blue-500 text-white hover:bg-blue-600 rounded-full px-8 py-2 transition-all hover:shadow-lg"
              >
                Talk
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#F8F8F8] text-gray-800 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">VoiceAgents</h3>
              <p className="text-gray-600">AI-powered voice agents for your business</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Features</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">About</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Privacy</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Terms</Link></li>
                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} VoiceAgents. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

