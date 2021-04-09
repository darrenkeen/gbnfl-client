import ReactCountdown from 'react-countdown';

interface CountdownProps {
  cacheTimestamp: string;
  cacheMinutes: number;
}

export const Countdown: React.FC<CountdownProps> = ({
  cacheTimestamp,
  cacheMinutes,
}) => {
  const date = new Date(cacheTimestamp);
  const timePlusMinutes = date.setMinutes(date.getMinutes() + cacheMinutes);
  const renderer = ({ minutes, seconds }) => {
    return (
      <span className="text-gray-400">
        Refresh {minutes < 10 && '0'}
        {minutes}:{seconds < 10 && '0'}
        {seconds}
      </span>
    );
  };

  return <ReactCountdown date={timePlusMinutes} renderer={renderer} />;
};
