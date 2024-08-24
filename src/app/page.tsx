'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { BoltIcon, CreditCardIcon, Lock, SmartphoneIcon, ZapIcon } from 'lucide-react'
import Link from 'next/link'

export default function Component() {
  const [email, setEmail] = useState('')

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const features = [
    { icon: ZapIcon, title: "Instant Transfers", description: "Send money in seconds, not days" },
    { icon: Lock, title: "Secure Transactions", description: "Bank-level encryption for your peace of mind" },
    { icon: SmartphoneIcon, title: "Mobile-First", description: "Designed for the way you live, on the go" }
  ]

  const howItWorks = [
    { step: 1, title: "Sign Up", description: "Create your account in minutes" },
    { step: 2, title: "Link Bank", description: "Connect your bank account securely" },
    { step: 3, title: "Start Flashing", description: "Send money with just a tap" }
  ]

  const testimonials = [
    { quote: "Flash Pay has revolutionized how I send money to friends. It's so fast and easy!", author: "Sarah J." },
    { quote: "I love how secure Flash Pay is. I feel confident using it for all my transactions.", author: "Michael T." },
    { quote: "The mobile app is fantastic. I can send money on the go with just a few taps!", author: "Emily R." }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex justify-between items-center fixed w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <Link className="flex items-center justify-center" href="/">
          <img src='https://i.ibb.co/x8Hv1xg/flashpay-05-removebg-preview-1.png' width={40} height={40} />
          <span className="ml-2 text-xl font-bold">Flash Pay</span>
        </Link>
        <div className="ml-4 flex gap-2">
          <Link href='/signin'>
          <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
            Log In
          </Button>
          </Link>
          <Link href='/signup'>
          <Button className="bg-primary hover:bg-primary/90 transition-colors">Sign Up</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <motion.section 
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div 
                className="space-y-2"
                variants={fadeIn}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Flash Pay
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  The fastest way to send and receive money. Instant transactions, anytime, anywhere.
                </p>
              </motion.div>
              <motion.div 
                className="space-x-4"
                variants={fadeIn}
                transition={{ delay: 0.4 }}
              >
                <Button className="bg-primary hover:bg-primary/90 transition-colors">Get Started</Button>
                <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">Learn More</Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="features" 
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div key={index} variants={fadeIn} transition={{ delay: index * 0.1 }}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="flex flex-col items-center space-y-2 p-6">
                      <feature.icon className="w-12 h-12 text-primary"/>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-center text-gray-500 dark:text-gray-400">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="how-it-works" 
          className="w-full py-12 md:py-24 lg:py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorks.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center space-y-2 p-4"
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div 
                    className="rounded-full bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center text-xl font-bold"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="testimonials" 
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={fadeIn} transition={{ delay: index * 0.1 }}>
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="flex flex-col space-y-2 p-6">
                      <p className="text-gray-500 dark:text-gray-400">"{testimonial.quote}"</p>
                      <p className="font-semibold">- {testimonial.author}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="call-to-action" 
          className="w-full py-12 md:py-24 lg:py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Sign up today and start sending money instantly with Flash Pay!
                </p>
              </motion.div>
              <motion.div className="space-x-4">
                <Button className="bg-primary hover:bg-primary/90 transition-colors">Sign Up Now</Button>
                <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  Learn More
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          id="newsletter" 
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Stay Updated
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Subscribe to our newsletter to receive the latest news and exclusive offers.
              </p>
              <motion.div 
                className="w-full sm:w-1/2"
                variants={fadeIn}
                transition={{ delay: 0.2 }}
              >
                <Input 
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-4"
                />
                <Button className="w-full bg-primary hover:bg-primary/90 transition-colors">Subscribe</Button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="bg-gray-800 text-gray-400 p-6">
        <div className="container mx-auto flex justify-between">
          <span>&copy; 2024 Flash Pay. All rights reserved.</span>
          <div className="space-x-4">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
            <Link href="#" className="hover:text-primary">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
