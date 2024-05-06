import '../styles/index.css';
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';


export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
export default MyApp 