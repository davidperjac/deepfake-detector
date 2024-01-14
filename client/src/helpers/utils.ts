export default function getPredictionFromResponse(
  prediction: number[][] | undefined
): string {
  if (!prediction) {
    return 'No prediction';
  }

  const max = Math.max(...prediction[0]);
  const index = prediction[0].indexOf(max);

  const labelClasses: { [key: number]: string } = {
    0: 'Deep-Fake',
    1: 'Real',
  };

  return labelClasses[index];
}
