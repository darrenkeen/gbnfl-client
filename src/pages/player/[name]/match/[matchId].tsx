import { format, addMilliseconds } from 'date-fns';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { LoaderSvg } from '../../../../components/LoaderSvg';
import { MODE_KEYS } from '../../../../constants';
import { CachedData, MatchData } from '../../../../types';
import { useFetch } from '../../../../utils/useFetch';
import { Stat } from '../../../../components/Stat';
import { MainTitle } from '../../../../components/MainTitle';
import { PlayerGroup } from '../../../../components/PlayerGroup';
import { Error } from '../../../../components/Error';

interface MatchPageProps {}

const matchStartDateFormat = (time: number) => {
  const date = new Date(time * 1000);
  const dateString = format(date, 'MM/dd/yy, HH:mm:ss');
  return `${dateString}`;
};
const matchDuration = (time: number) => {
  var helperDate = addMilliseconds(new Date(0), time);
  return format(helperDate, 'mm:ss');
};

const MatchPage: React.FC<MatchPageProps> = () => {
  const router = useRouter();
  const { matchId, name } = router.query;
  const { data, status, error } = useFetch<CachedData<MatchData>>(
    `/data/match/${matchId}`,
    null,
    !matchId || !name
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

  const matchData = data.data;
  const teams = matchData.teams;
  console.log(teams);
  const sortedTeamKeys = Object.entries(teams)
    .sort(([, a], [, b]) => a.teamPlacement - b.teamPlacement)
    .map(([k]) => k);
  const playerTeamKey = Object.keys(teams).find((key) => {
    const playerIndex = teams[key].players.findIndex((player) => {
      console.log(
        player.player.username === name,
        player.player.username,
        name
      );
      return player.player.username === name;
    });
    return playerIndex > -1;
  });

  return (
    <div>
      <Head>
        <title>GBNFL | Match</title>
      </Head>
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-bold text-white">
          {MODE_KEYS[matchData.mode]}
        </h1>
        <span className="block text-sm font-thin text-gray-400">
          {matchStartDateFormat(matchData.utcStartSeconds)}
        </span>
      </div>
      <div className="px-5 mb-10">
        <div className="grid w-full grid-cols-2 gap-10">
          <Stat name="Duration" value={matchDuration(matchData.duration)} />
          <Stat name="Players" value={matchData.playerCount.toString()} />
        </div>
      </div>
      <div className="px-5 mb-10 text-center">
        <span className="text-sm font-thin text-gray-400">#{matchId}</span>
      </div>
      <MainTitle title="Player Placement" />
      <div className="px-5 mt-5 mb-10">
        <PlayerGroup
          mode={matchData.mode}
          rank={teams[playerTeamKey].teamPlacement}
          kills={teams[playerTeamKey].kills}
          teamKdRatio={teams[playerTeamKey].teamKdRatio}
          players={teams[playerTeamKey].players}
        />
      </div>
      <MainTitle title="Standings" />
      <div className="px-5 mt-5">
        {sortedTeamKeys.map((key) => (
          <PlayerGroup
            key={key}
            mode={matchData.mode}
            rank={teams[key].teamPlacement}
            kills={teams[key].kills}
            teamKdRatio={teams[key].teamKdRatio}
            players={teams[key].players}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchPage;
