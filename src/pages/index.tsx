import Head from 'next/head';
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

      <TrophyTable />
      <WeeklyFeature />
    </div>
  );
}
