import { CodLatestData } from '../types';
import { useFetch } from '../utils/useFetch';
import { LoaderSvg } from './LoaderSvg';
import { LastUpdated } from './LastUpdated';
import { Countdown } from './Countdown';
import { Match } from './Match';

interface LatestMatchesProps {
  platformId: string;
  platformType: string;
  playerRouteName: string;
}

const getGrouped = (matches: CodLatestData['matches']) => {
  return matches.reduce((acc, curr) => {
    const date = new Date(curr.utcStartSeconds * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const key = `${day}/${month}/${year}`;
    const el = acc[key];

    if (el) {
      return { ...acc, [key]: [...el, curr] };
    } else {
      return { ...acc, [key]: [curr] };
    }
  }, {} as Record<string, CodLatestData['matches']>);
};

export const LatestMatches: React.FC<LatestMatchesProps> = ({
  platformId,
  platformType,
  playerRouteName,
}) => {
  const { status, data, error } = useFetch(
    `/data/latest/${encodeURIComponent(platformId)}/${platformType}`,
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
    <div>
      <div className="px-5">
        <div className="flex justify-between mb-5 text-sm">
          <LastUpdated cacheTimestamp={data.cacheTimestamp} />
          <Countdown cacheTimestamp={data.cacheTimestamp} cacheMinutes={5} />
        </div>
      </div>
      {Object.keys(getGrouped(data.data.matches)).map((dateKey) => (
        <div key={dateKey} className="w-full">
          <div className="px-5 py-4 mb-5 border-t border-b bg-gradient-to-r from-background-500 to-background-400 border-background-500">
            <h3 className="text-center text-white uppercase">{dateKey}</h3>
          </div>
          <div className="px-5">
            {getGrouped(data.data.matches)[dateKey].map((match) => (
              <Match
                key={match.matchID}
                matchId={match.matchID}
                kills={match.playerStats.kills}
                damage={match.playerStats.damageDone}
                startSeconds={match.utcStartSeconds}
                rank={match.playerStats.teamPlacement}
                kdRatio={match.playerStats.kdRatio}
                mode={match.mode}
                playerRouteName={playerRouteName}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
