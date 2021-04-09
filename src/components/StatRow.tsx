interface StatRowProps {
  label: string;
  value: string;
  name: string;
}

export const StatRow: React.FC<StatRowProps> = ({ label, value, name }) => {
  return (
    <div className="flex w-full px-5 py-2 mb-5 bg-gradient-to-r from-background-500 to-background-400">
      <div className="flex-1">
        <span className="text-lg text-white">{name}</span>
      </div>
      <div>
        <span className="text-lg font-bold text-white">{value} </span>
        <span className="font-thin text-gray-400 uppercase text-righttext-lg">
          {label}
        </span>
      </div>
    </div>
  );
};
