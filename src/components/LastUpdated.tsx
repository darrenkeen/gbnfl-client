import { format } from 'date-fns';

interface LastUpdatedProps {
  cacheTimestamp: string;
}

export const LastUpdated: React.FC<LastUpdatedProps> = ({ cacheTimestamp }) => {
  const date = new Date(cacheTimestamp);
  const dateString = format(date, 'HH:mm dd/MM/yy');

  return <span className="text-gray-400">Last updated {dateString}</span>;
};
