import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
  size?: 'small' | 'large';
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = ({ targetDate, size = 'large' }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  const isSmall = size === 'small';

  return (
    <div className={`flex gap-${isSmall ? '2' : '4'} justify-center lg:justify-start`}>
      {timeUnits.map(({ label, value }) => (
        <div
          key={label}
          className={`glass-dark rounded-lg ${isSmall ? 'p-2 sm:p-3' : 'p-4 sm:p-6'} text-center min-w-[60px] sm:min-w-[80px]`}
        >
          <div className={`${isSmall ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'} font-bold text-white font-orbitron`}>
            {value.toString().padStart(2, '0')}
          </div>
          <div className={`${isSmall ? 'text-xs' : 'text-sm'} text-white/50 mt-1 uppercase tracking-wider font-semibold`}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
};
