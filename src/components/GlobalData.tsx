import { useFetch } from '../utils/useFetch';
import { LoaderSvg } from './LoaderSvg';
import { Countdown } from './Countdown';
import { LastUpdated } from './LastUpdated';
import { Stat } from './Stat';

interface GlobalDataProps {
  platformId: string;
  platformType: string;
}

export const GlobalData: React.FC<GlobalDataProps> = ({
  platformId,
  platformType,
}) => {
  const { status, data, error } = useFetch(
    `/data/lifetime/${encodeURIComponent(platformId)}/${platformType}`,
    null
  );

  if (error) {
    return null;
  }

  if (status !== 'fetched') {
    return (
      <div className="flex justify-center">
        <LoaderSvg />
      </div>
    );
  }

  return (
    <div className="px-5">
      <div className="flex justify-between mb-5 text-sm">
        <LastUpdated cacheTimestamp={data.cacheTimestamp} />
        <Countdown cacheTimestamp={data.cacheTimestamp} cacheMinutes={5} />
      </div>
      <div className="grid grid-cols-2 gap-10">
        <Stat
          name="K/D"
          value={data.data.lifetime.mode.br.properties.kdRatio
            .toFixed(2)
            .toString()}
        />
        <Stat
          name="Wins"
          value={data.data.lifetime.mode.br.properties.wins.toString()}
        />
      </div>
    </div>
  );
};
