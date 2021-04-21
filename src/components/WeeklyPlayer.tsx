import { Fragment } from 'react';
import classnames from 'classnames';

import { useFetch } from '../utils/useFetch';
import { Stat } from './Stat';
import { LoaderSvg } from './LoaderSvg';
import { LastUpdated } from './LastUpdated';
import { Countdown } from './Countdown';
import { Error } from './Error';
import { MODE_KEYS } from '../constants';

export const WeeklyPlayer: React.FC<{ id: string; platform: string }> = ({
  id,
  platform,
}) => {
  const { data, status, error } = useFetch<any>(
    `/data/weekly/${encodeURIComponent(id)}/${platform}`,
    {}
  );

  if (status !== 'fetched') {
    return (
      <div className="flex justify-center">
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
    <div>
      <div className="px-5">
        <div className="flex justify-between mb-5 text-sm">
          <LastUpdated cacheTimestamp={data.cacheTimestamp} />
          <Countdown cacheTimestamp={data.cacheTimestamp} cacheMinutes={5} />
        </div>
      </div>
      {Object.keys(data.data)
        .sort(
          (a, b) =>
            Object.keys(MODE_KEYS).indexOf(a) -
            Object.keys(MODE_KEYS).indexOf(b)
        )
        .map((key, ind) => (
          <Fragment key={key}>
            <div
              className={classnames(
                'mb-5 px-5 py-4 bg-gradient-to-r from-background-500 to-background-400 border-t border-b border-background-500',
                {
                  'mt-10': ind !== 0,
                }
              )}
            >
              <h3 className="text-center text-white uppercase">
                {MODE_KEYS[key]}
              </h3>
            </div>
            <div className="px-5">
              {!data.data[key].kdRatio ? console.log(data.data[key]) : ''}
              <div className="grid w-full grid-cols-2 gap-10">
                <Stat name="K/D" value={data.data[key].kdRatio.toString()} />
                <Stat name="Kills" value={data.data[key].kills.toString()} />
              </div>
            </div>
          </Fragment>
        ))}
    </div>
  );
};
