import classNames from 'classnames';

import { useState } from 'react';
import { Player } from '../types';

interface InputGroupProps {
  player: Player;
  setPlayer: (playerId: string, kills: number) => void;
  removePlayer: (playerId: string) => void;
  isSelected: boolean;
}

export const PlayerAddBox: React.FC<InputGroupProps> = ({
  player,
  setPlayer,
  removePlayer,
  isSelected,
}) => {
  const [kills, setKills] = useState(0);

  // const onDateChange = useCallback((date: Date) => {
  //   setValue(date);
  // }, []);

  const onSelect = (updatedKills?: number) => {
    setPlayer(player.id, updatedKills || kills);
  };

  return (
    <>
      <div
        className={classNames(
          'flex w-full px-5 py-2 mb-5 bg-gradient-to-r from-background-500 to-background-400',
          {
            'border-2 border-red-200': isSelected,
          }
        )}
      >
        <div
          className="flex-1 cursor-pointer"
          onClick={() => {
            isSelected ? removePlayer(player.id) : onSelect();
          }}
        >
          <span className="text-lg text-white">{player.name}</span>
        </div>
        <div>
          <input
            type="number"
            min={0}
            className="w-12 p-1 text-center text-white bg-gradient-to-b from-background-400 to-background-300 focus:outline-none"
            value={kills}
            onChange={(e) => {
              setKills(Number(e.target.value));
              onSelect(Number(e.target.value));
            }}
          />
          <span className="font-thin text-gray-400 uppercase text-righttext-lg">
            {' '}
            Kills
          </span>
        </div>
      </div>
    </>
  );
};
