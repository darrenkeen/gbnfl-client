interface ErrorProps {
  message: string;
}

export const Error: React.FC<ErrorProps> = ({ message }) => (
  <div>
    <span className="text-white">{message}</span>
  </div>
);
