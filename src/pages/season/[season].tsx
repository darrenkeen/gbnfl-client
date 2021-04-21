import Head from 'next/head';
import { LoaderSvg } from '../../components/LoaderSvg';
import { Error } from '../../components/Error';
import { MainTitle } from '../../components/MainTitle';

import { useFetch } from '../../utils/useFetch';

export default function Season() {
  const { data, status, error } = useFetch<any>(`/matches`, {});

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
      <Head>
        <title>The GBNFL - Season </title>
      </Head>
      <div>
        <MainTitle title="Season 2" />
      </div>
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
    </div>
  );
}
