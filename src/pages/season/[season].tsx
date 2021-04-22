import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { LoaderSvg } from '../../components/LoaderSvg';
import { Error } from '../../components/Error';
import { MainTitle } from '../../components/MainTitle';
import { useFetch } from '../../utils/useFetch';
import { Button } from '../../components/Button';

export default function Season() {
  const router = useRouter();
  const { season } = router.query;
  const { data, status, error } = useFetch<any>(
    `/matches/${season}`,
    {},
    !season,
    season
  );
  const {
    data: seasonData,
    status: seasonStatus,
    error: seasonError,
  } = useFetch<any>(`/data/seasons`, {});

  if (status !== 'fetched' || seasonStatus !== 'fetched') {
    return (
      <div className="flex justify-center">
        <LoaderSvg />
      </div>
    );
  }

  if (error || seasonError) {
    return (
      <div className="flex justify-center mb-10">
        <Error message={error} />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>The GBNFL - Season {season}</title>
      </Head>
      <div>
        <MainTitle title={`Season ${season}`} />
      </div>
      {data.data.length < 1 && (
        <div className="block my-10">
          <h3 className="text-lg text-center text-white">No wins so far...</h3>
        </div>
      )}
      {data.data
        .sort((a, b) => (a.utcStartSeconds > b.utcStartSeconds ? -1 : 1))
        .map((game) => {
          const date = new Date(0);
          date.setUTCSeconds(game.utcStartSeconds);
          return (
            <div key={game.id}>
              <div className="px-5 py-4 mb-5 border-t border-b bg-gradient-to-r from-background-500 to-background-400 border-background-500">
                <h3 className="text-center text-white uppercase">
                  {date.toDateString()}
                </h3>
                <div className="mt-5 text-center">
                  {game.trophies.map((trophy) => (
                    <div className="block mb-2" key={trophy.id}>
                      <span className="font-thin text-white">
                        {trophy.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      <MainTitle title="Past seasons" />
      <div className="flex px-5 my-10">
        {Object.keys(seasonData.data).map((key, index) => {
          const { start, end } = seasonData.data[key];

          return (
            <div key={key} className={index === 0 ? 'mr-5' : ''}>
              <Link href={`/season/${key}`}>
                <div>
                  <Button
                    key={key}
                    label={`Season ${key}`}
                    type="full"
                    disabled={key === season}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
