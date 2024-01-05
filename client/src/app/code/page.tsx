import CodeBlock from '@/common/components/code-block';

export default function CodePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 gap-8">
      <h1 className="text-5xl">
        Watch the<span className="text-warning"> code</span>
      </h1>
      <CodeBlock />
    </main>
  );
}
