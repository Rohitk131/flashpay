"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  BoltIcon,
  CreditCardIcon,
  Lock,
  SmartphoneIcon,
  ZapIcon,
} from "lucide-react";
import Link from "next/link";
import { Cover } from "@/components/ui/cover";
import BackgroundCover from "@/components/background";

export default function Component() {
  const [email, setEmail] = useState("");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: ZapIcon,
      title: "Instant Transfers",
      description: "Send money in seconds, not days",
    },
    {
      icon: Lock,
      title: "Secure Transactions",
      description: "Bank-level encryption for your peace of mind",
    },
    {
      icon: SmartphoneIcon,
      title: "Mobile-First",
      description: "Designed for the way you live, on the go",
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Sign Up",
      description: "Create your account in minutes",
    },
    {
      step: 2,
      title: "Link Bank",
      description: "Connect your bank account securely",
    },
    {
      step: 3,
      title: "Start Flashing",
      description: "Send money with just a tap",
    },
  ];

  const testimonials = [
    {
      quote:
        "Flash Pay has revolutionized how I send money to friends. It's so fast and easy!",
      author: "Sarah J.",
    },
    {
      quote:
        "I love how secure Flash Pay is. I feel confident using it for all my transactions.",
      author: "Michael T.",
    },
    {
      quote:
        "The mobile app is fantastic. I can send money on the go with just a few taps!",
      author: "Emily R.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
      <header className="px-4 lg:px-6 h-16 flex justify-between rounded-b-2xl items-center fixed w-full bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 z-50 shadow-md">
        <Link className="flex items-center justify-center" href="/">
          <img
            src="https://i.ibb.co/x8Hv1xg/flashpay-05-removebg-preview-1.png"
            width={40}
            height={40}
            alt="Flash Pay Logo"
          />
          <span className="ml-2 text-xl font-bold text-primary">Flash Pay</span>
        </Link>
        <div className="ml-4 flex gap-2">
          <Link href="/signin">
            <Button
              variant="outline"
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <div className="relative">
          <div className="absolute inset-0 z-10">
            <BackgroundCover />
          </div>

          <motion.section
            className="relative z-20 w-full flex flex-col items-center py-10 justify-center text-center text-white"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="space-y-4"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                When time matters, trust the speed and reliability of{" "}
                <Cover>Flash Pay</Cover>
              </h1>
              <p className="max-w-[700px] mx-auto text-base md:text-2xl text-black">
                The fastest way to send and receive money. Instant transactions,
                anytime, anywhere.
              </p>
            </motion.div>
            <motion.div
              className="flex space-x-4 mt-6"
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              <Link href="/signup">
                <Button className="px-6 py-3 text-lg bg-white text-primary rounded-full shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105">
                  Get Started
                </Button>
              </Link>
              <Button
                variant="outline"
                className="px-6 py-3 text-lg bg-transparent border-white text-black rounded-full shadow-md hover:bg-white hover:text-primary transition-transform transform hover:scale-105"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.section>
        </div>

        {/* Other Sections */}
        <motion.section
          id="features"
          className="w-full py-24 bg-white dark:bg-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-4xl font-bold tracking-tight text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg hover:scale-105 transition-all duration-300">
                    <CardContent className="flex flex-col items-center space-y-4 p-8">
                      <feature.icon className="w-16 h-16 text-primary" />
                      <h3 className="text-2xl font-semibold">
                        {feature.title}
                      </h3>
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="how-it-works"
          className="w-full py-24 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-4xl font-bold tracking-tight text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {howItWorks.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="rounded-full bg-primary text-white w-14 h-14 flex items-center justify-center text-xl font-bold"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="testimonials"
          className="w-full py-24 bg-gray-50 dark:bg-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-4xl font-bold tracking-tight text-center mb-12">
              Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="italic text-gray-600 dark:text-gray-400">
                    &quot;{testimonial.quote}&quot;
                  </p>

                  <p className="font-semibold">{testimonial.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
