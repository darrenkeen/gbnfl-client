import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GlobalData } from '../../../components/GlobalData';
import { LatestMatches } from '../../../components/LatestMatches';
import { LoaderSvg } from '../../../components/LoaderSvg';
import { MainTitle } from '../../../components/MainTitle';
import { Match } from '../../../components/Match';
import { Stat } from '../../../components/Stat';
import { WeeklyPlayer } from '../../../components/WeeklyPlayer';
import { CodLatestData, CodLifetimeData, PlayerTrophies } from '../../../types';
import { getPlatformType } from '../../../utils/getPlatformType';

interface PlayerPageProps {}

const PlayerPage: React.FC<PlayerPageProps> = () => {
  const router = useRouter();
  const { name } = router.query;
  const [player, setPlayer] = useState<PlayerTrophies>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (name) {
      axios
        .get(`/trophies/${name}/2`)
        .then((res) => {
          setPlayer(res.data);
        })
        .catch(() => {
          setError(true);
        });
    }
  }, [name]);

  if (!player) {
    return (
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
        <LoaderSvg />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Head>
          <title>GBNFL | {name}</title>
        </Head>
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-orange-500">{name}</h1>
          <span className="block text-white">
            {getPlatformType(player.platformType)}
          </span>
        </div>
        <div className="text-center">
          <h1 className="text-xl text-white">Profile is private</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>GBNFL | {name}</title>
      </Head>
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-bold text-white">{name}</h1>
        <span className="block text-red-100">
          {getPlatformType(player.platformType)}
        </span>
      </div>

      <div className="mb-20">
        <MainTitle title="Global Stats" />
        <GlobalData
          platformId={player.platformId}
          platformType={player.platformType}
        />
      </div>
      <div className="mb-20">
        <MainTitle title="Weekly" />
        <WeeklyPlayer id={player.platformId} platform={player.platformType} />
      </div>
      <div className="mb-20">
        <MainTitle title="Season 2" />
        <div className="px-5 mt-5">
          <div className="grid grid-cols-2 gap-10">
            <Stat name="Trophies" value={player.trophyCount.toString()} />
            <Stat name="Kills" value={player.totalKills.toString()} />
          </div>
        </div>
      </div>
      <div className="mb-20">
        <MainTitle title="Last 20 matches" />
        <LatestMatches
          playerRouteName={name as string}
          platformId={player.platformId}
          platformType={player.platformType}
        />
      </div>
    </div>
  );
};

export default PlayerPage;
