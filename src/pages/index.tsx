import Head from 'next/head';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { TrophyTable } from '../components/TrophyTable';
import { WeeklyFeature } from '../components/WeeklyFeature';

dayjs.extend(relativeTime);

export default function Home() {
  return (
    <div>
      <Head>
        <title>The GBNFL</title>
      </Head>
      <div className="rounded-b-3xl bg-gradient-to-b from-transparent to-background-300">
        <div className="flex justify-center px-5 mb-10">
          <TrophyTable />
        </div>
        <div className="flex justify-center px-5 mb-10">
          <Link href="/add">
            <button className="w-full py-2 mb-10 font-bold text-white uppercase border border-red-100 text-md bg-gradient-to-t from-red-100 to-red-200 text-x rounded-3xl hover:from-red-200 hover:to-red-100 focus:outline-none">
              Add trophy
            </button>
          </Link>
        </div>
      </div>
      <WeeklyFeature />
    </div>
  );
}
