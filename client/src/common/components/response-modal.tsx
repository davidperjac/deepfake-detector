import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import Image from 'next/image';

import { Response } from '@/types/response';
import getPredictionFromResponse from '@/helpers/utils';

type ResponseModalProps = {
  isOpen: boolean;
  file: File | undefined;
  onOpenChange: () => void;
  response: Response | undefined;
};

export default function ResponseModal({
  file,
  isOpen,
  response,
  onOpenChange,
}: ResponseModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Your Prediction!</ModalHeader>
            <ModalBody className="flex flex-row items-center">
              <Image
                width={128}
                height={128}
                alt="detected-image"
                className="rounded-md"
                src={file ? URL.createObjectURL(file) : '/user.png'}
              />
              <div className="flex flex-col gap-4">
                <p>
                  Filename:
                  <span> {file?.name}</span>
                </p>
                <p>
                  Prediction:
                  <span>
                    {' '}
                    {getPredictionFromResponse(response?.prediction)}
                  </span>
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="warning"
                onPress={onClose}
              >
                Predict Again
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
