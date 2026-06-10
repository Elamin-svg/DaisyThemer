import { motion } from "motion/react";
import { type ReactNode } from "react";

export interface TabItem {
  id: string;
  label: ReactNode;
}

export interface AnimatedTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: any) => void;
  className?: string;
}

export function AnimatedTabs({ tabs, activeTab, onChange, className = "" }: AnimatedTabsProps) {
  return (
    <div className={`flex space-x-1 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`${activeTab === tab.id ? "text-base-content" : "text-base-content/70   hover:text-base-content"
            } relative rounded-full px-3 py-1.5   cursor-pointer text-sm font-medium   transition focus-visible:outline-2 z-10`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 -z-10 bg-base-300/60  "
              style={{ borderRadius: 9999 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
