"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"  // Add this import
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FcGoogle } from 'react-icons/fc'

export default function SignupPage() {
  // The 2 states given below were used with Google signup
  // const [showPopup, setShowPopup] = useState(false);
  // const [tempBusinessName, setTempBusinessName] = useState("");
  const router=useRouter() 
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
    username: ""
  })

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          business_name: formData.businessName,
          email: formData.email,
          password: formData.password,
          username: formData.username
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        alert(`Error: ${errorData.detail}`)
      } else {
        alert("Account created successfully!")
        router.push('/dashboard')  // Add this line to redirect
      }
    } catch (error) {
      alert(`Something went wrong: `)
    } finally {
      setIsLoading(false)
    }
  }


  // const handleGoogleSignUp = async () => {
  //   if (!formData.businessName && !tempBusinessName) {
  //     setShowPopup(true);
  //     return;
  //   }

  //   const businessNameToSend = formData.businessName || tempBusinessName;

  //   try {
  //     const response = await fetch("http://localhost:8000/auth/login/google", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ business_name: businessNameToSend }),
  //     });

  //     if (response.ok) {
  //       const { auth_url } = await response.json();
  //       window.location.href = auth_url;
  //     } else {
  //       const errorData = await response.json();
  //       alert(`Error: ${errorData.detail}`);
  //     }
  //   } catch (error) {
  //     alert(`Something went wrong`);
  //   }
  // };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8] p-4 w-full">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Create an account</CardTitle>
          <CardDescription>Get started with your free account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                placeholder="Enter your Business name"
                required
                className="rounded-xl bg-[#F8F8F8]"
                value={formData.businessName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="rounded-xl bg-[#F8F8F8]"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter a username"
                required
                className="rounded-xl bg-[#F8F8F8]"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                required
                className="rounded-xl bg-[#F8F8F8]"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-xl" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

{/* 
          <div className="mt-4">
            <Button variant="outline" className="w-full rounded-xl flex items-center justify-center" onClick={handleGoogleSignUp}>
              <FcGoogle className="mr-2" />
              Continue with Google
            </Button>
          </div>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                <h2 className="text-lg font-semibold">Enter Business Name</h2>
                <Input
                  placeholder="Business Name"
                  value={tempBusinessName}
                  onChange={(e) => setTempBusinessName(e.target.value)}
                  className="mt-3"
                />
                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowPopup(false)}>Cancel</Button>
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => {
                      setShowPopup(false);
                      handleGoogleSignUp();
                    }}
                    disabled={!tempBusinessName}
                  >
                    Continue
                  </Button>

                </div>
              </div>
            </div>
          )} */}



          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
