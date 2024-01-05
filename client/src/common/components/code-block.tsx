'use client';

import { CODE } from '@/helpers';
import { CopyBlock, monokai } from 'react-code-blocks';

export default function CodeBlock() {
  const language = 'python';
  const showLineNumbers = true;

  return (
    <CopyBlock
      text={CODE}
      language={language}
      showLineNumbers={showLineNumbers}
      theme={monokai}
      codeBlock
    />
  );
}
