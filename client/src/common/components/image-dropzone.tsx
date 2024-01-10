'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

import Image from 'next/image';
import { TrashIcon, UploadIcon, WarningIcon } from '@/common/icons';

export default function ImageDropzone() {
  const [file, setFile] = useState<File | undefined>();

  const [isImageDetected, setIsImageDetected] = useState<boolean>(false);

  const [detectedImage, setDetectedImage] = useState<File>();

  const onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  };

  const onRemove = () => {
    setFile(undefined);
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const URL = String(process.env.NEXT_PUBLIC_BASE_URL);
    const data = await fetch(URL, {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());

    setIsImageDetected(true);
    setDetectedImage(data);
    console.log(data);
  };

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
    },
    maxSize: 20 * 1000,
    maxFiles: 1,
    onDrop,
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <ul key={file.name}>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    );
  });

  return (
    <>
      <Modal
        isOpen={isImageDetected}
        onOpenChange={() => setIsImageDetected(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {detectedImage?.file.filename}
              </ModalHeader>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
            color="warning"
          >
            Detect
          </Button>
        </div>
      </div>
    </>
  );
}
