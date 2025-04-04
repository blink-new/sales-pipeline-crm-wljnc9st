
import { Check, HelpCircle, Zap } from "lucide-react"
import { Button } from "../components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip"
import { Badge } from "../components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"

const features = {
  free: [
    "Up to 25 deals",
    "Basic pipeline view",
    "Deal tracking",
    "Email support",
  ],
  pro: [
    "Unlimited deals",
    "Advanced analytics",
    "Custom fields",
    "Multiple pipelines",
    "Team collaboration",
    "Priority support",
    "API access",
    "Data export",
    "Custom reporting",
    "Automation workflows",
  ],
}

const faqs = [
  {
    question: "Can I try Pro features before paying?",
    answer: "Yes! We offer a 14-day free trial of all Pro features. No credit card required.",
  },
  {
    question: "What happens to my data if I downgrade?",
    answer: "Your data is safely stored but Pro features will be disabled. You can access it again by upgrading.",
  },
  {
    question: "Is there a limit on team members?",
    answer: "Pro plan includes unlimited team members at no extra cost.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee, no questions asked.",
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Sales Director",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?&w=128&h=128&fit=crop&crop=face",
    quote: "The Pro features helped us close 40% more deals in the first month.",
  },
  {
    name: "James Wilson",
    role: "Founder",
    company: "Startup Hub",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=128&h=128&fit=crop&crop=face",
    quote: "The automation workflows alone saved us 15 hours per week.",
  },
]

export function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Ready to take your sales to the next level?
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upgrade to Pro and unlock powerful features to close more deals, faster.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Free Tier */}
        <div className="rounded-xl border p-8">
          <h3 className="text-2xl font-bold mb-2">Free</h3>
          <p className="text-muted-foreground mb-4">Perfect for getting started</p>
          <div className="mb-6">
            <span className="text-4xl font-bold">$0</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <Button variant="outline" className="w-full mb-8">
            Current Plan
          </Button>
          <ul className="space-y-4">
            {features.free.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pro Tier */}
        <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-8 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge variant="default" className="bg-violet-600">
              MOST POPULAR
            </Badge>
          </div>
          <h3 className="text-2xl font-bold mb-2">Pro</h3>
          <p className="text-muted-foreground mb-4">For serious sales teams</p>
          <div className="mb-6">
            <span className="text-4xl font-bold">$29</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <Button className="w-full mb-8 bg-violet-600 hover:bg-violet-700">
            <Zap className="mr-2 h-4 w-4" />
            Upgrade Now
          </Button>
          <ul className="space-y-4">
            {features.pro.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-violet-500" />
                <span>{feature}</span>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-48">Learn more about {feature.toLowerCase()}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Testimonials */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="rounded-xl border p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* CTA */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 text-violet-700 mb-6">
          <Zap className="h-4 w-4" />
          <span className="text-sm font-medium">30-day money-back guarantee</span>
        </div>
        <h2 className="text-3xl font-bold mb-4">
          Start closing more deals today
        </h2>
        <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
          Upgrade to Pro
        </Button>
      </div>
    </div>
  )
}