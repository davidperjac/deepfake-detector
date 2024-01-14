import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

type UseImageDropzoneReturn = {
  file: File | undefined;
  fileRejectionItems: JSX.Element[];
  onRemove: () => void;
  getRootProps: () => any;
  getInputProps: () => any;
};

export const useImageDropzone = () => {
  const [file, setFile] = useState<File | undefined>();

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const onRemove = () => {
    setFile(undefined);
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

  return {
    file,
    fileRejectionItems,
    onRemove,
    getRootProps,
    getInputProps,
  };
};
