'use client';

import { useCallback, useState } from 'react';
import { CodeIcon, JavaScriptIcon, LoaderIcon, PlayIcon } from './icons';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  node: any;
  inline: boolean;
  className: string;
  children: any;
}

export function CodeBlock({
  node,
  inline,
  className,
  children,
  ...props
}: CodeBlockProps) {
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const isJavaScript = match && ['js', 'javascript'].includes(match[1]);
  const codeContent = String(children).replace(/\n$/, '');
  const [tab, setTab] = useState<'code' | 'run'>('code');

  const runJavaScript = useCallback(async () => {
    setIsRunning(true);
    try {
      // Create a safe execution environment
      const consoleOutput: string[] = [];
      const sandbox = {
        console: {
          log: (...args: any[]) => consoleOutput.push(args.join(' ')),
          error: (...args: any[]) => consoleOutput.push(`Error: ${args.join(' ')}`),
          warn: (...args: any[]) => consoleOutput.push(`Warning: ${args.join(' ')}`)
        }
      };

      const code = `with (sandbox) { ${codeContent} }`;
      const fn = new Function('sandbox', code);
      await fn(sandbox);
      
      setOutput(consoleOutput.join('\n'));
      setTab('run');
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setTab('run');
    } finally {
      setIsRunning(false);
    }
  }, [codeContent]);

  if (!inline) {
    return (
      <>
        {tab === 'code' && (
          <code
            {...props}
            className={`block text-sm w-full overflow-x-auto dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl dark:text-zinc-50 text-zinc-900 relative`}
          >
            {isJavaScript && (
              <span className="absolute right-4 top-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={runJavaScript}
                      disabled={isRunning}
                    >
                      {isRunning ? <LoaderIcon size={16} /> : <PlayIcon size={16} />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Run code</TooltipContent>
                </Tooltip>
              </span>
            )}
            <span className="whitespace-pre-wrap break-words">{children}</span>
          </code>
        )}

        {tab === 'run' && output && (
          <code className="block text-sm w-full overflow-x-auto bg-zinc-800 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-700 border-t-0 rounded-b-xl text-zinc-50">
            {output}
          </code>
        )}
      </>
    );
  }
  else {
    return (
      <code
        className={`${className} text-sm bg-zinc-100 dark:bg-zinc-800 py-0.5 px-1 rounded-md`}
        {...props}
      >
        {children}
      </code>
    );
  }
}
