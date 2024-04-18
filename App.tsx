import { StatusBar } from 'expo-status-bar';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { ThemeProvider } from 'styled-components';
import theme from './src/theme';
import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import { GymContextProvider } from './src/context/gymContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular, 
    Roboto_700Bold
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='dark' backgroundColor='transparent' translucent />
      <GymContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </GymContextProvider>
    </ThemeProvider>
  )
}