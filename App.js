import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import GetStarted from './src/screens/LoginPage';



export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <GetStarted />
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
