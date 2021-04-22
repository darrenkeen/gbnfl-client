import { Fragment, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import classNames from 'classnames';

import { generateTrophyEmoji } from '../utils/generateTrophyEmoji';
import { useFetch } from '../utils/useFetch';
import { LoaderSvg } from '../components/LoaderSvg';
import { Error } from '../components/Error';
import { PlayerTrophies } from '../types';
import axios from 'axios';
import { Button } from './Button';

export const TrophyTable = () => {
  const { status, data, error } = useFetch<PlayerTrophies[]>('/trophies/3', []);
  const [fetchingTrackMatches, setFetchingTrackMatches] = useState(false);
  const router = useRouter();

  const trackMatches = () => {
    setFetchingTrackMatches(true);
    axios
      .get('/matches/track-match')
      .then((res) => {
        if (res.status !== 204) {
          console.error({ error: 'Not 204', message: res });
        }
        setFetchingTrackMatches(false);
      })
      .catch((e) => {
        console.error(e);
        setFetchingTrackMatches(false);
      });
  };

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
        <Button
          label="Check for trophies"
          type="full"
          disabled={fetchingTrackMatches}
          onClick={() => {
            if (!fetchingTrackMatches) {
              trackMatches();
            }
          }}
        />
        <Link href="/season/3">
          <Button label="View wins" type="outline" />
        </Link>
      </div>
    </div>
  );
};
