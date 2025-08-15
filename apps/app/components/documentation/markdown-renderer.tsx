/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { useEffect, useState } from "react";
import { CodeBlock } from "./code-block";
import { Callout } from "./callout";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface ParsedElement {
  type: 'heading' | 'paragraph' | 'code' | 'list' | 'blockquote' | 'table' | 'hr';
  level?: number;
  content: string;
  language?: string;
  items?: string[];
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const [elements, setElements] = useState<ParsedElement[]>([]);

  useEffect(() => {
    const parsed = parseMarkdown(content);
    setElements(parsed);
  }, [content]);

  return (
    <div className={`prose prose-slate max-w-none dark:prose-invert ${className}`}>
      {elements.map((element, index) => (
        <MarkdownElement key={index} element={element} />
      ))}
    </div>
  );
}

function parseMarkdown(markdown: string): ParsedElement[] {
  const lines = markdown.split('\n');
  const elements: ParsedElement[] = [];
  let currentElement: ParsedElement | null = null;
  let inCodeBlock = false;
  let codeContent = '';
  let codeLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code blocks
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        elements.push({
          type: 'code',
          content: codeContent.trim(),
          language: codeLanguage,
        });
        inCodeBlock = false;
        codeContent = '';
        codeLanguage = '';
      } else {
        // Start code block
        inCodeBlock = true;
        codeLanguage = trimmed.slice(3).trim() || 'text';
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      elements.push({
        type: 'heading',
        level: headingMatch[1].length,
        content: headingMatch[2],
      });
      continue;
    }

    // Horizontal rule
    if (trimmed === '---' || trimmed === '***') {
      elements.push({
        type: 'hr',
        content: '',
      });
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      elements.push({
        type: 'blockquote',
        content: line.slice(2),
      });
      continue;
    }

    // Lists
    const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      const content = listMatch[3];
      if (currentElement?.type === 'list') {
        currentElement.items?.push(content);
      } else {
        currentElement = {
          type: 'list',
          content: '',
          items: [content],
        };
        elements.push(currentElement);
      }
      continue;
    }

    // Empty line - reset current element
    if (trimmed === '') {
      currentElement = null;
      continue;
    }

    // Paragraph
    if (trimmed) {
      if (currentElement?.type === 'paragraph') {
        currentElement.content += ' ' + trimmed;
      } else {
        currentElement = {
          type: 'paragraph',
          content: trimmed,
        };
        elements.push(currentElement);
      }
    }
  }

  return elements;
}

function MarkdownElement({ element }: { element: ParsedElement }) {
  switch (element.type) {
    case 'heading':
      const HeadingTag = `h${element.level}` as keyof JSX.IntrinsicElements;
      const headingClass = {
        1: 'text-4xl font-bold mb-6 mt-8',
        2: 'text-3xl font-bold mb-4 mt-6',
        3: 'text-2xl font-bold mb-3 mt-5',
        4: 'text-xl font-bold mb-2 mt-4',
        5: 'text-lg font-bold mb-2 mt-3',
        6: 'text-base font-bold mb-1 mt-2',
      }[element.level || 1];

      // Create an ID from the heading text for scroll spy
      const headingId = element.content.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

      return (
        <HeadingTag 
          id={headingId} 
          className={headingClass}
        >
          {element.content}
        </HeadingTag>
      );

    case 'paragraph':
      const content = processInlineMarkdown(element.content);
      return <p className="mb-4 leading-relaxed">{content}</p>;

    case 'code':
      return (
        <div className="mb-4">
          <CodeBlock
            code={element.content}
            language={element.language}
            showLineNumbers={element.content.split('\n').length > 5}
          />
        </div>
      );

    case 'list':
      return (
        <ul className="mb-4 space-y-1">
          {element.items?.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
              <span>{processInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      );

    case 'blockquote':
      return (
        <div className="mb-4">
          <Callout type="info">
            {processInlineMarkdown(element.content)}
          </Callout>
        </div>
      );

    case 'hr':
      return <hr className="my-8 border-border" />;

    default:
      return null;
  }
}

function processInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold **text**
    const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
    if (boldMatch) {
      const beforeBold = remaining.substring(0, boldMatch.index);
      if (beforeBold) parts.push(beforeBold);
      parts.push(<strong key={key++}>{boldMatch[1]}</strong>);
      remaining = remaining.substring((boldMatch.index || 0) + boldMatch[0].length);
      continue;
    }

    // Italic *text*
    const italicMatch = remaining.match(/\*(.*?)\*/);
    if (italicMatch) {
      const beforeItalic = remaining.substring(0, italicMatch.index);
      if (beforeItalic) parts.push(beforeItalic);
      parts.push(<em key={key++}>{italicMatch[1]}</em>);
      remaining = remaining.substring((italicMatch.index || 0) + italicMatch[0].length);
      continue;
    }

    // Code `text`
    const codeMatch = remaining.match(/`(.*?)`/);
    if (codeMatch) {
      const beforeCode = remaining.substring(0, codeMatch.index);
      if (beforeCode) parts.push(beforeCode);
      parts.push(
        <code key={key++} className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.substring((codeMatch.index || 0) + codeMatch[0].length);
      continue;
    }

    // Links [text](url)
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      const beforeLink = remaining.substring(0, linkMatch.index);
      if (beforeLink) parts.push(beforeLink);
      parts.push(
        <a
          key={key++}
          href={linkMatch[2]}
          className="text-primary hover:text-primary/80 underline"
          target={linkMatch[2].startsWith('http') ? '_blank' : undefined}
          rel={linkMatch[2].startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.substring((linkMatch.index || 0) + linkMatch[0].length);
      continue;
    }

    // No more matches, add remaining text
    parts.push(remaining);
    break;
  }

  return parts;
}