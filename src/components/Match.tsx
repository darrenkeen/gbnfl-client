import classNames from 'classnames';

import { formatDate } from '../utils/formatDate';
import { MODE_KEYS, WITH_RANK_MODE } from '../constants';
import Link from 'next/link';

interface MatchProps {
  kills: number;
  startSeconds: number;
  damage: number;
  rank: number;
  kdRatio: number;
  matchId: string;
  mode: keyof typeof MODE_KEYS;
  playerRouteName: string;
  inGameId: string;
}

const MatchItem: React.FC<{ title?: string; value: number | string }> = ({
  title,
  value,
}) =>
  title === 'rank' ? (
    <div>
      <span
        className={classNames(
          'flex items-center justify-center w-16 h-full px-5 font-bold text-white text-bold bg-gradient-to-r ',
          {
            ' from-red-100 to-red-200 border border-red-100':
              value === '1' || value === 1,
            'from-background-200 to-background-300':
              value !== '1' && value !== 1,
          }
        )}
      >
        {value}
      </span>
    </div>
  ) : (
    <div className="text-left">
      <span className="block text-lg font-bold text-white">{value} </span>
      <span className="block text-gray-400 uppercase">{title}</span>
    </div>
  );

export const Match: React.FC<MatchProps> = ({
  kills,
  damage,
  startSeconds,
  rank,
  kdRatio,
  mode,
  matchId,
  playerRouteName,
  inGameId,
}) => {
  return (
    <Link
      href={`/player/${playerRouteName}/match/${matchId}/${encodeURIComponent(
        inGameId
      )}`}
    >
      <div className="px-4 py-5 mb-5 border-t border-b shadow-lg cursor-pointer bg-gradient-to-r from-background-300 to-background-400 border-background-500 rounded-xl">
        <div className="flex justify-between mb-5">
          <div className="text-left">
            <span className="block font-bold text-white">
              {MODE_KEYS[mode]}
            </span>
            <span className="block text-white">{formatDate(startSeconds)}</span>
          </div>
          {WITH_RANK_MODE.includes(mode) && (
            <MatchItem title="rank" value={rank} />
          )}
        </div>
        <div className="flex justify-between">
          <MatchItem title="Kills" value={kills} />
          <MatchItem title="K/D" value={kdRatio.toFixed(2)} />
          <MatchItem title="DMG" value={damage} />
        </div>
      </div>
    </Link>
  );
};
