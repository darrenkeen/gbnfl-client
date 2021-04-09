interface InputGroupProps {
  value: string;
  name: string;
}

export const Stat: React.FC<InputGroupProps> = ({ value, name }) => {
  return (
    <div className="px-5 py-2 text-center shadow-lg rounded-xl bg-gradient-to-br from-background-600 to-background-700">
      <span className="block text-xl font-bold text-white">{value}</span>
      <span className="block font-thin text-gray-400 uppercase text-md">
        {name}
      </span>
    </div>
  );
};
