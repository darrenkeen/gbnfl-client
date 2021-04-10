import { AppProps } from 'next/app';
import Axios from 'axios';

import Navbar from '../components/Navbar';
import '../styles/tailwind.css';

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
Axios.defaults.withCredentials = true;

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="container max-w-2xl">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
