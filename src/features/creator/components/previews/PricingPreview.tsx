import { useState } from "react";

export function PricingPreview() {
  const [activeTab, setActiveTab] = useState<"Monthly" | "Annually">("Monthly");

  return (
    <div className="bg-base-100 text-base-content transition-colors py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="badge mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Pricing plans
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-base-content/70">No hidden fees. No surprise charges. Choose the plan that best fits your needs.</p>

          <div className="mt-10  tabs w-fit mx-auto  ">
            <a className={`tab ${activeTab === "Monthly" ? "tab-active" : ""}`} onClick={() => setActiveTab("Monthly")}>Monthly</a>
            <a className={`tab ${activeTab === "Annually" ? "tab-active" : ""}`} onClick={() => setActiveTab("Annually")}>Annually</a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {/* Basic */}
          <div className="card bg-base-100 card-border border-base-200 shadow-sm">
            <div className="card-body p-8">
              <h3 className="text-lg font-bold opacity-80">Basic</h3>
              <p className="text-sm opacity-60 mt-2 font-medium">Essential features you need to get started.</p>
              <div className="my-6">
                <span className="text-5xl font-bold tracking-tight">$19</span>
                <span className="opacity-60 text-sm ml-1 font-medium">/month</span>
              </div>
              <button className="btn btn-outline w-full font-bold">Get started</button>
              <div className="divider my-6"></div>
              <ul className="flex flex-col gap-4 text-sm font-medium opacity-80">
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  Up to 5 projects
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  Basic analytics
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  24-hour support response time
                </li>
              </ul>
            </div>
          </div>

          {/* Pro */}
          <div className="card bg-base-100 card-border border-primary shadow-xl md:-mt-8 md:mb-8 relative z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="badge badge-primary font-bold px-4 py-3 shadow-md">Most Popular</span>
            </div>
            <div className="card-body p-8">
              <h3 className="text-lg font-bold text-primary">Pro</h3>
              <p className="text-sm opacity-60 mt-2 font-medium">Perfect for growing teams and businesses.</p>
              <div className="my-6">
                <span className="text-5xl font-bold tracking-tight">$49</span>
                <span className="opacity-60 text-sm ml-1 font-medium">/month</span>
              </div>
              <button className="btn btn-primary w-full font-bold shadow-sm">Get started</button>
              <div className="divider my-6"></div>
              <ul className="flex flex-col gap-4 text-sm font-medium">
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  Unlimited projects
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  Advanced analytics
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  1-hour support response time
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  Custom domains
                </li>
              </ul>
            </div>
          </div>

          {/* Business */}
          <div className="card bg-base-100 card-border border-base-200 shadow-sm">
            <div className="card-body p-8">
              <h3 className="text-lg font-bold opacity-80">Business</h3>
              <p className="text-sm opacity-60 mt-2 font-medium">Advanced features for scaling organizations.</p>
              <div className="my-6">
                <span className="text-5xl font-bold tracking-tight">$99</span>
                <span className="opacity-60 text-sm ml-1 font-medium">/month</span>
              </div>
              <button className="btn btn-outline w-full font-bold">Contact Sales</button>
              <div className="divider my-6"></div>
              <ul className="flex flex-col gap-4 text-sm font-medium opacity-80">
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  Everything in Pro
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  Dedicated account manager
                </li>
                <li className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  SSO & advanced security
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
