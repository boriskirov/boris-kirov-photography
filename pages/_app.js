import "../styles/os.css";
import { OsNavStateProvider } from "../components/os/OsNavState";

export default function MyApp({ Component, pageProps }) {
  return (
    <OsNavStateProvider>
      <Component {...pageProps} />
    </OsNavStateProvider>
  );
}
