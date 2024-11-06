import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Calendar, Clock, Activity, Users, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      title: "Easy Scheduling",
      description: "Book appointments with just a few clicks",
      icon: <Calendar className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Real-time Tracking",
      description: "Monitor your recovery progress",
      icon: <Activity className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Expert Therapists",
      description: "Connect with certified professionals",
      icon: <Users className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Flexible Hours",
      description: "Sessions available 7 days a week",
      icon: <Clock className="h-8 w-8 text-blue-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Path to Recovery
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional physiotherapy services at your fingertips. Book
            appointments, track progress, and recover faster.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Book Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Start Your Recovery Journey Today
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of satisfied patients who have improved their quality
            of life through our platform.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
}
