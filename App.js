import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import StartupPage from './src/components/startUpPage';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <StartupPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
