import Head from 'next/head';
import { LoaderSvg } from '../../components/LoaderSvg';
import { Error } from '../../components/Error';
import { MainTitle } from '../../components/MainTitle';

import { useFetch } from '../../utils/useFetch';

export default function Season() {
  const { data, status, error } = useFetch<any>(`/games`, {});

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

  console.log(data);

  return (
    <div>
      <Head>
        <title>The GBNFL - Season </title>
      </Head>
      <div>
        <MainTitle title="Season 2" />
      </div>
      {data
        .filter((dataGame) => dataGame.trophies.length !== 0)
        .map((game) => (
          <div key={game.id}>
            <div className="px-5 py-4 mb-5 border-t border-b bg-gradient-to-r from-background-500 to-background-400 border-background-500">
              <h3 className="text-center text-white uppercase">
                {new Date(game.dateTime).toDateString()}
              </h3>
              <div className="mt-5 text-center">
                {game.trophies.map((trophy) => (
                  <div className="block mb-2" key={trophy.id}>
                    <span className="font-thin text-white">
                      {trophy.name}
                      <span className="block text-gray-300">
                        {trophy.kills}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
