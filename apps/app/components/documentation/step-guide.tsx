/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { CheckCircle, Circle } from "lucide-react";

interface Step {
  title: string;
  content: React.ReactNode;
  completed?: boolean;
}

interface StepGuideProps {
  steps: Step[];
  currentStep?: number;
  className?: string;
}

export function StepGuide({ steps, currentStep, className = "" }: StepGuideProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {steps.map((step, index) => {
        const isActive = currentStep === index;
        const isCompleted = step.completed || (currentStep !== undefined && index < currentStep);
        
        return (
          <div key={index} className={`relative flex gap-4 ${index < steps.length - 1 ? 'pb-6' : ''}`}>
            {/* Vertical line */}
            {index < steps.length - 1 && (
              <div className="absolute left-[11px] top-6 h-full w-0.5 bg-border" />
            )}
            
            {/* Step indicator */}
            <div className="flex-shrink-0">
              {isCompleted ? (
                <CheckCircle className="h-5 w-5 text-green-600 bg-background rounded-full" />
              ) : (
                <Circle className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted-foreground'} bg-background rounded-full`} />
              )}
            </div>
            
            {/* Step content */}
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold mb-2 ${isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded mr-2">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {step.title}
              </h3>
              
              <div className={`prose prose-sm max-w-none ${isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                {step.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}