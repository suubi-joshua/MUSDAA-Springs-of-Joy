//Startup Page
import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, TextInput, Form } from 'carbon-components-react';
import * as Animatable from 'react-native-animatable';
import Logo from '../assets/Logo-Components-7.png';


const StartupPage = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    // Trigger the animation when the component mounts
    if (logoRef.current) {
      logoRef.current.fadeIn(2000); // You can adjust the duration as need
    }
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.View ref={logoRef} style={styles.logoContainer}>
        <Image
          source={Logo} alt="Logo"
          style={styles.logo}
          resizeMode="contain"
        />
      </Animatable.View>
      <Form style={styles.form}>
        <TextInput id="username" labelText="Username" />
        <TextInput id="password" labelText="Password" type="password" />
        <Button>Sign In</Button>
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 200, // Adjust the width and height based on your logo dimensions
    height: 200,
  },
  form: {
    width: '80%',
  },
});

export default StartupPage;

