'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { memo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface SuggestedActionsProps {
  chatId: string;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'Data Sources',
      label: 'I have available',
      action: 'Show me available data sources',
    },
    {
      title: 'Write code to',
      label: `filter events where the event_type is "click"`,
      action: `Write javascript lambda code that take in json and filters events where the event_type is "click"`,
    },
    {
      title: 'Help me write an essay',
      label: `about silicon valley`,
      action: `Help me write an essay about silicon valley`,
    },
    {
      title: 'What is the weather',
      label: 'in San Francisco?',
      action: 'What is the weather in San Francisco?',
    },
  ];

  return (
    <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  window.history.replaceState({}, '', `/chat/${chatId}`);
                  append({
                    role: 'user',
                    content: suggestedAction.action,
                  });
                }}
                className="px-3 py-2 h-auto whitespace-nowrap"
              >
                <span className="text-sm">{suggestedAction.title}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{suggestedAction.label}</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
