'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@nextui-org/react';

import { Response } from '@/types/response';

import ResponseModal from '@/common/components/response-modal';
import { TrashIcon, UploadIcon, WarningIcon } from '@/common/icons';

import { getDetection } from '@/services/detection';
import { useImageDropzone } from '@/hooks/useImageDropzone';

export default function ImageDropzone() {
  const [response, setResponse] = useState<Response>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isImageDetected, setIsImageDetected] = useState<boolean>(false);

  const { file, fileRejectionItems, onRemove, getRootProps, getInputProps } =
    useImageDropzone();

  const handleSubmit = async () => {
    setIsImageDetected(true);
    setIsLoading(true);

    try {
      if (!file) return;

      const response = await getDetection(file);

      setResponse(response);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <ResponseModal
        file={file}
        response={response}
        isLoading={isLoading}
        isOpen={isImageDetected}
        onOpenChange={() => setIsImageDetected(false)}
      />
      <div className="flex gap-12 items-center">
        <div className="flex flex-col gap-4 items-center">
          <section
            className="border-2 border-dashed border-warning rounded-md"
            style={{ borderStyle: 'dashed', padding: '8rem' }}
          >
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="flex flex-col gap-4 items-center">
                <UploadIcon
                  width={100}
                  height={100}
                />
                <p>Drag and drop some files here, or click to select files</p>
              </div>
            </div>
          </section>
          <p className="text-danger text-lg">{fileRejectionItems}</p>
          <div className="flex gap-2 items-center text-warning">
            <WarningIcon />
            <p className="text-lg">
              File should be 256x256px, and in .jpg format.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="relative">
            <Image
              width={256}
              height={256}
              src={file ? URL.createObjectURL(file) : '/user.png'}
              alt="user-image"
              className="rounded-md"
            />
            {file && (
              <div
                className="absolute text-danger"
                style={{ top: '-1rem', right: '-1rem' }}
              >
                <Button
                  isIconOnly
                  color="danger"
                  aria-label="Like"
                  onClick={onRemove}
                >
                  <TrashIcon />
                </Button>
              </div>
            )}
          </div>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="solid"
            style={{
              opacity: !file ? 0.5 : 1,
              cursor: !file ? 'not-allowed' : 'pointer',
            }}
            color="warning"
            disabled={!file}
          >
            Detect
          </Button>
        </div>
      </div>
    </>
  );
}
