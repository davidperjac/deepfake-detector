'use client';

import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from '@nextui-org/react';
import { useContext } from 'react';

import { DeepfakeContext } from '@/helpers';

export default function InfoModal() {
  const { isOpen, onOpenChange } = useContext(DeepfakeContext);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Welcome to Deepfake Detector!
            </ModalHeader>
            <ModalBody>
              <p>
                This is a simple deepfake detector built with Next.js, FastAPI,
                and TensorFlow.
              </p>
              <p>
                The model is trained on the OpenForensics dataset from
                Trung-Nghia, which is a collection of 191,000 photos of 256x256
                of real and fake faces. The model is trained to detect whether a
                face is real or fake.
              </p>
              <p>
                The model is trained with a Convolutional Neural Network (CNN)
                using TensorFlow. This model was trained on Google Colab Pro,
                downloaded to the FastAPI server, and then used to make
                predictions. The model is 91.2% accurate on the test set.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="warning"
                onPress={onClose}
              >
                Got It!
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
