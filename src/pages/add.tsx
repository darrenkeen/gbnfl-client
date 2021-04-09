import axios from 'axios';
import Head from 'next/head';
import { DropdownDate, DropdownComponent } from 'react-dropdown-date';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { PlayerAddBox } from '../components/PlayerAddBox';
import { Player } from '../types';

const formatDate = (date: string) => {
  // formats a JS date to 'yyyy-mm-dd'
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export default function Add() {
  const [selectedPlayers, setSelectedPlayers] = useState<
    { kills: number; playerId: string }[]
  >([]);
  const [errors, setErrors] = useState<any>({});

  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDate(new Date().toISOString())
  );

  useEffect(() => {
    axios
      .get('/players')
      .then((res) => setPlayers(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const router = useRouter();

  const submitForm = async () => {
    try {
      const res = await axios.post('/trophies', {
        players: selectedPlayers,
        season: 2,
        dateTime: selectedDate,
      });
      router.push('/');
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const setPlayer = (playerId: string, kills: number) => {
    const playerExistsIndex = selectedPlayers.findIndex(
      (player) => player.playerId === playerId
    );
    if (playerExistsIndex === -1) {
      setSelectedPlayers([...selectedPlayers, { playerId, kills }]);
    } else {
      const currentSelectedPlayers = [...selectedPlayers];
      currentSelectedPlayers[playerExistsIndex] = { playerId, kills };
      setSelectedPlayers([...currentSelectedPlayers]);
    }
  };

  const removePlayer = (playerId: string) => {
    const selectedPlayersWithout = selectedPlayers.filter(
      (player) => player.playerId !== playerId
    );
    setSelectedPlayers([...selectedPlayersWithout]);
  };

  return (
    <div>
      <Head>
        <title>Add Trophies</title>
      </Head>
      <div className="">
        {players.map((player) => (
          <PlayerAddBox
            key={player.id}
            player={player}
            setPlayer={setPlayer}
            removePlayer={removePlayer}
            isSelected={
              selectedPlayers.findIndex((p) => p.playerId === player.id) > -1
            }
          />
        ))}
      </div>
      <div className="px-4 my-10">
        <DropdownDate
          startDate={'2021-01-01'}
          endDate={'2021-04-03'}
          selectedDate={selectedDate}
          order={[
            DropdownComponent.day,
            DropdownComponent.month,
            DropdownComponent.year,
          ]}
          onDateChange={(date) => {
            setSelectedDate(formatDate(date));
          }}
          classes={
            // optional
            {
              dateContainer: 'grid grid-cols-3 gap-4',
              yearContainer: 'w-full',
              monthContainer: 'w-full',
              dayContainer: '',
              year:
                'w-full font-body p-3  text-white bg-gradient-to-b from-background-400 to-background-300 focus:outline-none',
              month:
                'w-full font-body p-3  text-white bg-gradient-to-b from-background-400 to-background-300 focus:outline-none',
              day:
                'w-full font-body p-3  text-white bg-gradient-to-b from-background-400 to-background-300 focus:outline-none',
            }
          }
          defaultValues={{
            year: 'Year',
            month: 'Month',
            day: 'Day',
          }}
          options={{
            yearReverse: true,
            monthShort: true,
            monthCaps: true,
          }}
        />
      </div>
      <div className="flex justify-center px-5 mt-10">
        <button
          onClick={submitForm}
          className="w-full py-2 mb-10 font-bold text-white uppercase border border-red-100 text-md bg-gradient-to-t from-red-100 to-red-200 text-x rounded-3xl hover:from-red-200 hover:to-red-100 focus:outline-none"
        >
          Add trophy
        </button>
      </div>
    </div>
  );
}
