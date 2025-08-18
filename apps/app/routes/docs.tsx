import React from 'react';
import ReactMarkdown from 'react-markdown';
import { createFileRoute } from '@tanstack/react-router';
import gettingStarted from '../../../docs/getting-started.md?raw';

export const Route = createFileRoute('/docs')({
  component: DocsPage,
});

function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{gettingStarted}</ReactMarkdown>
      </div>
    </div>
  );
}