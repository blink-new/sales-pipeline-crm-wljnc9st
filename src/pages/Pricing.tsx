
import { Check, HelpCircle, Zap, Star } from "lucide-react"
import { Button } from "../components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip"
import { Badge } from "../components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"
import { cn } from "../lib/utils"

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
    <div className="mx-auto max-w-5xl px-4 py-16">
      {/* Header with gradient background */}
      <div className="relative mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 px-6 py-16 text-center text-white shadow-xl">
        <div className="relative z-10">
          <h1 className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Ready to take your sales to the next level?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Upgrade to Pro and unlock powerful features to close more deals, faster.
          </p>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHg9IjAiIHk9IjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDYwIEwgNjAgNjAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PHBhdGggZD0iTSA2MCAwIEwgNjAgNjAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10"></div>
      </div>

      {/* Pricing Cards */}
      <div className="mb-16 grid gap-8 md:grid-cols-2">
        {/* Free Tier */}
        <div className="group relative rounded-xl border bg-card p-8 shadow-sm transition-all hover:shadow-md">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-2xl font-bold">Free</h3>
            <Badge variant="secondary">STARTER</Badge>
          </div>
          <p className="text-muted-foreground mb-4">Perfect for getting started</p>
          <div className="mb-6">
            <span className="text-4xl font-bold">$0</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <Button variant="outline" className="mb-8 w-full">
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
        <div className="group relative rounded-xl border-2 border-violet-200 bg-gradient-to-b from-violet-50 to-white p-8 shadow-lg transition-all hover:shadow-xl">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 transform">
            <Badge className="border-2 border-violet-200 bg-violet-600 px-3 py-1">
              <Star className="mr-1 h-3.5 w-3.5" />
              MOST POPULAR
            </Badge>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-2xl font-bold">Pro</h3>
            <Badge variant="secondary" className="bg-violet-100 text-violet-700">
              BEST VALUE
            </Badge>
          </div>
          <p className="text-muted-foreground mb-4">For serious sales teams</p>
          <div className="mb-6">
            <span className="text-4xl font-bold">$29</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <Button className="mb-8 w-full bg-violet-600 hover:bg-violet-700">
            <Zap className="mr-2 h-4 w-4" />
            Upgrade Now
          </Button>
          <ul className="space-y-4">
            {features.pro.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-violet-500" />
                <span>{feature}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-muted-foreground transition-colors hover:text-violet-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-48">Learn more about {feature.toLowerCase()}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16 grid gap-8 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="group relative rounded-xl border bg-card p-6 transition-all hover:shadow-md"
          >
            <div className="absolute -right-2 -top-2 text-violet-500 opacity-10 transition-opacity group-hover:opacity-20">
              <svg
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
              </svg>
            </div>
            <div className="mb-4 flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-12 w-12 rounded-full ring-2 ring-violet-100"
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
        <h2 className="mb-8 text-center text-2xl font-bold">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="mx-auto max-w-2xl">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          )))}
        </Accordion>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 p-8 text-center shadow-sm">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-white">
          <Zap className="h-4 w-4" />
          <span className="text-sm font-medium">30-day money-back guarantee</span>
        </div>
        <h2 className="mb-4 text-3xl font-bold">
          Start closing more deals today
        </h2>
        <Button
          size="lg"
          className="bg-violet-600 hover:bg-violet-700"
        >
          Upgrade to Pro
        </Button>
      </div>
    </div>
  )
}