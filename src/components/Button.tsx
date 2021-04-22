interface ButtonProps {
  label: string;
  type: keyof typeof buttonStyles;
  disabled?: boolean;
  onClick?: (...props: any) => void;
}

const buttonStyles = {
  full:
    'w-full py-2 px-4 mb-3 font-bold text-white uppercase border border-red-100 text-md bg-gradient-to-t from-red-100 to-red-200 text-x rounded-3xl hover:from-red-200 hover:to-red-100 focus:outline-none disabled:opacity-40 disabled:cursor-default',
  outline:
    'w-full py-2 mb-10 font-thin text-white uppercase border border-white text-md text-x rounded-3xl focus:outline-none',
};

export const Button: React.FC<ButtonProps> = ({ label, type, ...props }) => {
  return (
    <button {...props} className={buttonStyles[type]}>
      {label}
    </button>
  );
};
