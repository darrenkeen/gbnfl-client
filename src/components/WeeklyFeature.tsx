import { LoaderSvg } from '../components/LoaderSvg';
import { useWeeklyLeaderboard } from '../utils/useWeeklyLeaderboard';
import { StatRow } from './StatRow';

interface WeeklyFeatureProps {}

export const WeeklyFeature: React.FC<WeeklyFeatureProps> = ({}) => {
  const { weeklyLeaderboard, status, error } = useWeeklyLeaderboard();
  if (status !== 'fetched') {
    return (
      <div className="flex justify-center">
        <LoaderSvg />
      </div>
    );
  }
  if (error) {
    return null;
  }

  if (!weeklyLeaderboard.kdRatioLeader || !weeklyLeaderboard.killsLeader) {
    return null;
  }

  return (
    <div className="mb-20">
      <div className="px-5 py-3 mb-10 bg-gradient-to-r from-red-100 to-red-200">
        <h2 className="text-xl text-center text-white">Weekly leaderboard</h2>
      </div>
      <StatRow
        label="KD Ratio"
        name={weeklyLeaderboard.kdRatioLeader.name}
        value={weeklyLeaderboard.kdRatioLeader.value}
      />
      <StatRow
        label="Kills"
        name={weeklyLeaderboard.killsLeader.name}
        value={weeklyLeaderboard.killsLeader.value}
      />
      <StatRow label="Gulag Wins" name="TBC" value="0" />
      <StatRow label="DMG" name="TBC" value="0" />
    </div>
  );
};
