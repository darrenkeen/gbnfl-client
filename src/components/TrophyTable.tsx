import { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import classNames from 'classnames';

import { generateTrophyEmoji } from '../utils/generateTrophyEmoji';
import { useFetch } from '../utils/useFetch';
import { LoaderSvg } from '../components/LoaderSvg';
import { Error } from '../components/Error';
import { PlayerTrophies } from '../types';

export const TrophyTable = () => {
  const { status, data, error } = useFetch<PlayerTrophies[]>('/trophies/2', []);
  const router = useRouter();

  if (status !== 'fetched') {
    return (
      <div className="flex justify-center mb-10">
        <LoaderSvg />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center mb-10">
        <Error message={error} />
      </div>
    );
  }

  return (
    <div className="rounded-b-3xl bg-gradient-to-b from-transparent to-background-300">
      <div className="flex justify-center px-5 mb-10">
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
      </div>
      <div className="justify-center px-5 mb-10">
        <Link href="/add">
          <button className="w-full py-2 mb-3 font-bold text-white uppercase border border-red-100 text-md bg-gradient-to-t from-red-100 to-red-200 text-x rounded-3xl hover:from-red-200 hover:to-red-100 focus:outline-none">
            Add trophy
          </button>
        </Link>
        <Link href="/season/2">
          <div>
            <button className="w-full py-2 mb-10 font-thin text-white uppercase border border-white text-md text-x rounded-3xl focus:outline-none">
              View wins
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};
