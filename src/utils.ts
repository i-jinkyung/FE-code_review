export const getTimeFormat = (duration: number): string => {
  const milliseconds = String(duration % 100).padStart(2, '0');
  const seconds = String(Math.floor((duration / 100) % 60)).padStart(2, '0');
  const minutes = String(Math.floor(duration / (100 * 60))).padStart(2, '0');

  return `${minutes} : ${seconds} : ${milliseconds}`
}
