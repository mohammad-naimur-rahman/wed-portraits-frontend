import store from '@/redux/store'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
