import classNames from 'classnames';

import { MODE_KEYS } from '../constants';
import { MatchPlayers } from '../types';

interface PlayerGroupProps {
  mode: keyof typeof MODE_KEYS;
  rank: number;
  kills: number;
  teamKdRatio: number;
  players: MatchPlayers[];
}

const PlayerStatItem: React.FC<{ name: string; value: string | number }> = ({
  name,
  value,
}) => {
  return (
    <div>
      <span className="font-bold">{value}</span>{' '}
      <span className="text-gray-500">{name}</span>
    </div>
  );
};

const PlayerItem: React.FC<{ player: MatchPlayers; isLast: boolean }> = ({
  player,
  isLast,
}) => {
  return (
    <div
      className={classNames('py-3', {
        'border-b border-gray-500': !isLast,
      })}
    >
      <span className="block mb-2 text-white">
        {player.player.clantag && (
          <span className="text-white">
            [{player.player.clantag.replace('^3', '').replace('^7', '')}]&nbsp;
          </span>
        )}
        {player.player.username}
      </span>
      <div className="flex justify-between text-sm text-white">
        <PlayerStatItem
          value={`${player.playerStats.kills}/${player.playerStats.deaths}`}
          name="K/D"
        />
        <PlayerStatItem
          value={player.playerStats.kdRatio.toFixed(2)}
          name="KD Ratio"
        />
        <PlayerStatItem value={player.playerStats.damageDone} name="DMG" />
      </div>
    </div>
  );
};

const PlayerGroupItem: React.FC<{ title?: string; value: number | string }> = ({
  title,
  value,
}) =>
  title === 'rank' ? (
    <div>
      <span
        className={classNames(
          'flex items-center justify-center h-full px-5 font-bold text-white text-bold bg-gradient-to-r ',
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
      <span className="block text-sm font-thin text-gray-400 uppercase">
        {title}
      </span>
    </div>
  );

export const PlayerGroup: React.FC<PlayerGroupProps> = ({
  mode,
  rank,
  kills,
  teamKdRatio,
  players,
}) => {
  return (
    <div className="mb-5">
      <div className="relative z-10 px-4 py-3 border-t border-b shadow-lg bg-gradient-to-r from-background-300 to-background-400 border-background-500 rounded-xl">
        <div className="flex justify-between">
          <PlayerGroupItem title="Kills" value={kills} />
          <PlayerGroupItem title="K/D" value={teamKdRatio?.toFixed(2)} />
          {MODE_KEYS[mode] !== MODE_KEYS.br_dmz_plnbld && (
            <PlayerGroupItem title="rank" value={rank} />
          )}
        </div>
      </div>
      <div className="px-4 pt-12 pb-3 mb-5 -mt-10 border-t border-b shadow-lg bg-gradient-to-r from-background-300 to-background-400 border-background-500 rounded-xl">
        {players.map((player, index) => (
          <PlayerItem
            key={player.player.username}
            player={player}
            isLast={index === players.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
