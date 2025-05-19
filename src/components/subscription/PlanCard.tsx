import React from 'react';
import { Check } from 'lucide-react';
import { SubscriptionPlan } from '../../types';
import { Button } from '../ui/Button';

interface PlanCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan?: boolean;
  onSelect: (planId: string) => void;
  isLoading?: boolean;
}

export function PlanCard({ plan, isCurrentPlan, onSelect, isLoading }: PlanCardProps) {
  return (
    <div
      className={`relative rounded-lg p-6 ${
        isCurrentPlan
          ? 'bg-primary/10 border-2 border-primary'
          : 'bg-gray-800 border border-gray-700'
      }`}
    >
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
          Current Plan
        </div>
      )}

      <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
      
      <div className="mb-4">
        <span className="text-3xl font-bold text-white">${plan.price}</span>
        <span className="text-gray-400">/month</span>
      </div>

      <div className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-center text-gray-300">
            <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={() => onSelect(plan.id)}
        variant={isCurrentPlan ? 'outline' : 'primary'}
        fullWidth
        isLoading={isLoading}
        disabled={isLoading || isCurrentPlan}
      >
        {isCurrentPlan ? 'Current Plan' : 'Choose Plan'}
      </Button>
    </div>
  );
}