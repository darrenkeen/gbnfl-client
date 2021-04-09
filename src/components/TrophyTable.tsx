import { useState, useEffect, Fragment } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import { PlayerTrophies } from '../types';
import { generateTrophyEmoji } from '../utils/generateTrophyEmoji';
import { useFetch } from '../utils/useFetch';
import { LoaderSvg } from '../components/LoaderSvg';

export const TrophyTable = () => {
  const { status, data, error } = useFetch<PlayerTrophies[]>('/trophies/2', []);
  const router = useRouter();

  if (status !== 'fetched') {
    return (
      <div className="flex justify-center">
        <LoaderSvg />
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <div className="w-full shadow-lg">
      <div className="grid overflow-hidden border-t border-red-100 rounded-tl-lg rounded-tr-lg grid-cols-table bg-gradient-to-b from-red-200 to-red-100">
        <div className="px-4 py-3 bg-gradient-to-r from-transparent to-red-300">
          <span className="text-white text-md">Player</span>
        </div>
        <div className="px-4 py-3">
          <span className="text-white text-md">Trophies</span>
        </div>
      </div>
      <div className="grid overflow-hidden grid-cols-table bg-gradient-to-b">
        {data.map((pt, index) => (
          <Fragment key={pt.name}>
            <div
              className={classNames(
                'flex px-4 py-3 items-center text-sm text-white',
                {
                  'bg-gradient-to-r from-transparent to-background-800':
                    index % 2 !== 0,
                  'bg-gradient-to-r from-transparent to-background-900':
                    index % 2 === 0,
                }
              )}
            >
              <span
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/player/${encodeURIComponent(pt.name)}`);
                }}
              >
                {pt.name}
              </span>
            </div>
            <div
              className={classNames('flex px-4 py-3', {
                'bg-background-100': index % 2 !== 0,
                'bg-background-200': index % 2 === 0,
              })}
            >
              <span className="text-lg">
                {generateTrophyEmoji(pt.trophyCount)}
                <span className="opacity-40">
                  {generateTrophyEmoji(pt.unapprovedCount)}
                </span>
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
