interface MainTitleProps {
  title: string;
}

export const MainTitle: React.FC<MainTitleProps> = ({ title }) => {
  return (
    <div className="px-5 py-3 mb-3 bg-gradient-to-r from-red-100 to-red-200">
      <h1 className="text-xl text-center text-white">{title}</h1>
    </div>
  );
};
