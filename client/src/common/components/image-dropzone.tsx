'use client';

import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Button } from '@nextui-org/react';

import Image from 'next/image';
import { TrashIcon, UploadIcon, WarningIcon } from '@/common/icons';

export default function ImageDropzone() {
  const [file, setFile] = useState<File | undefined>();

  const onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  };

  const onRemove = () => {
    setFile(undefined);
  };

  return (
    <div className="flex gap-12 items-center">
      <div className="flex flex-col gap-4 items-center">
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
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
          )}
        </Dropzone>
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
          variant="solid"
          color="warning"
        >
          Detect
        </Button>
      </div>
    </div>
  );
}
