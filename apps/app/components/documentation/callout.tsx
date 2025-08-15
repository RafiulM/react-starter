/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { AlertTriangle, Info, CheckCircle, XCircle, Lightbulb } from "lucide-react";

interface CalloutProps {
  type?: "info" | "warning" | "success" | "error" | "tip";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutConfig = {
  info: {
    icon: Info,
    colors: "border-blue-200 bg-blue-50/50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-100",
    iconColors: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    colors: "border-yellow-200 bg-yellow-50/50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-100",
    iconColors: "text-yellow-600 dark:text-yellow-400",
  },
  success: {
    icon: CheckCircle,
    colors: "border-green-200 bg-green-50/50 text-green-900 dark:border-green-800 dark:bg-green-950/30 dark:text-green-100",
    iconColors: "text-green-600 dark:text-green-400",
  },
  error: {
    icon: XCircle,
    colors: "border-red-200 bg-red-50/50 text-red-900 dark:border-red-800 dark:bg-red-950/30 dark:text-red-100",
    iconColors: "text-red-600 dark:text-red-400",
  },
  tip: {
    icon: Lightbulb,
    colors: "border-purple-200 bg-purple-50/50 text-purple-900 dark:border-purple-800 dark:bg-purple-950/30 dark:text-purple-100",
    iconColors: "text-purple-600 dark:text-purple-400",
  },
};

export function Callout({ type = "info", title, children, className = "" }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div className={`rounded-lg border-l-4 p-4 ${config.colors} ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${config.iconColors}`} />
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-1 text-sm uppercase tracking-wide">
              {title}
            </h4>
          )}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}