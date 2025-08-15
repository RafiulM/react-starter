/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Badge } from "@repo/ui";
import { CodeBlock } from "./code-block";

interface ApiParameter {
  name: string;
  type: string;
  required?: boolean;
  description: string;
  defaultValue?: string;
}

interface ApiMethod {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  description: string;
  parameters?: ApiParameter[];
  responses?: Record<string, string>;
  example?: string;
}

interface ApiReferenceProps {
  methods: ApiMethod[];
  className?: string;
}

const methodColors: Record<string, string> = {
  GET: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  POST: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  PUT: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  PATCH: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
};

export function ApiReference({ methods, className = "" }: ApiReferenceProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {methods.map((method, index) => (
        <div key={index} className="border rounded-lg p-6 bg-muted/20">
          {/* Method header */}
          <div className="flex items-center gap-3 mb-4">
            <Badge className={`font-mono text-xs font-bold ${methodColors[method.method]}`}>
              {method.method}
            </Badge>
            <code className="bg-muted px-2 py-1 rounded font-mono text-sm">
              {method.endpoint}
            </code>
          </div>
          
          <p className="text-muted-foreground mb-4">{method.description}</p>
          
          {/* Parameters */}
          {method.parameters && method.parameters.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Parameters</h4>
              <div className="space-y-3">
                {method.parameters.map((param, paramIndex) => (
                  <div key={paramIndex} className="border-l-4 border-muted pl-4 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">
                        {param.name}
                      </code>
                      <span className="text-sm text-muted-foreground">
                        {param.type}
                      </span>
                      {param.required && (
                        <Badge variant="outline" className="text-xs">
                          required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {param.description}
                    </p>
                    {param.defaultValue && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Default: <code>{param.defaultValue}</code>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Responses */}
          {method.responses && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Responses</h4>
              <div className="space-y-2">
                {Object.entries(method.responses).map(([status, description]) => (
                  <div key={status} className="flex items-center gap-3">
                    <code className={`px-2 py-1 rounded text-sm font-mono ${
                      status.startsWith('2') 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : status.startsWith('4') || status.startsWith('5')
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                    }`}>
                      {status}
                    </code>
                    <span className="text-sm text-muted-foreground">{description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Example */}
          {method.example && (
            <div>
              <h4 className="font-semibold mb-3">Example</h4>
              <CodeBlock
                code={method.example}
                language="bash"
                title={`${method.method} ${method.endpoint}`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}