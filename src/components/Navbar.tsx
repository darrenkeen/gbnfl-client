import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-full px-5 my-10 h-44">
      <div className="flex items-center">
        <Link href="/">
          <div className="cursor-pointer">
            <Image src="/logo.png" layout="fill" objectFit="contain" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
