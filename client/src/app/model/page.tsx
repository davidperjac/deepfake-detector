import ImageDropzone from '@/common/components/image-dropzone';

export default function ModelPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 gap-8">
      <h1 className="text-5xl">
        Upload a<span className="text-warning"> photo</span>
      </h1>
      <ImageDropzone />
    </main>
  );
}
