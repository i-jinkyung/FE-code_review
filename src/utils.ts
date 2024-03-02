const 초 = 1000;
const 분 = 초 * 60;

export const getTimeFormat = (duration: number): string => {
  const milliseconds = duration % (초 / 10);
  const seconds = Math.floor((duration / 초) % 60);
  const minutes = Math.floor(duration / 분);

  return [minutes, seconds, milliseconds].map(value => String(value).padStart(2, '0')).join(' : ');
}
