import axios from 'axios';
import Head from 'next/head';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ApprovalGame } from '../types';

export default function Approve() {
  const [games, setGames] = useState<ApprovalGame[]>([]);
  const [approved, setApproved] = useState<string[]>([]);
  useEffect(() => {
    axios
      .get('/trophies/approve')
      .then((res) => setGames(res.data))
      .catch((err) => console.error(err));
  }, []);

  const router = useRouter();

  const submitForm = async () => {
    try {
      const res = await axios.post('/trophies/approve', {
        trophies: approved,
      });
      router.push('/');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      {games.length < 1 && (
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-orange-500">
            Nothing to approve
          </h1>
        </div>
      )}
      <div className="container grid grid-cols-2 gap-5 px-5">
        {games.map((game) => (
          <div key={game.gameId}>
            <h1 className="text-2xl font-bold text-orange-500">
              {new Date(game.dateTime).toDateString()}
            </h1>
            {game.trophies.map((trophy) => (
              <div
                className={classnames('cursor-pointer', {
                  'bg-gray-700': approved.includes(trophy.trophyId),
                })}
                key={trophy.trophyId}
                onClick={() => {
                  const alreadyExists = approved.includes(trophy.trophyId);
                  if (alreadyExists) {
                    setApproved([
                      ...approved.filter((a) => a !== trophy.trophyId),
                    ]);
                  } else {
                    setApproved([...approved, trophy.trophyId]);
                  }
                }}
              >
                <span className="text-white">
                  {trophy.playerName}

                  <span className="ml-3 text-gray-500">
                    kills: {trophy.kills}
                  </span>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center px-5 mt-10">
        <button
          disabled={approved.length < 1}
          onClick={submitForm}
          className={classnames(
            'py-2 mb-10 text-xl font-bold text-white uppercase bg-orange-500 w-160 text-x rounded-xl disabled:opacity-50',
            {
              'cursor-auto': approved.length < 1,
            }
          )}
        >
          Approve
        </button>
      </div>
    </div>
  );
}
