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
                This is a simple deepfake detector built with Next.js, NextUI,
                and TensorFlow.
              </p>
              <p>
                The model is trained on the DeepFake-TIMIT dataset, which is a
                collection of videos of people speaking. The dataset contains
                both real and fake videos, and the model is trained to
                differentiate between the two.
              </p>
              <p>
                The model is trained with a Convolutional Neural Network (CNN)
                using TensorFlow.js. The model is then converted to a
                TensorFlow.js model, and then loaded into the browser.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="warning"
                onPress={onClose}
              >
                Understood!
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
