import "../styles/global.css"

import { ChalengedProvider } from '../contexts/ChalengedContext'


function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  )
}

export default MyApp
