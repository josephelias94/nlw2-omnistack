import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GiveClassesBgImg from '../../images/give-classes-background.png';
import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';

function GiveClasses() {
  const { goBack } = useNavigation();

  function handleNavigateToHomePage() {
    goBack();
  }

  return (
    <View style={styles.container}>
      <ImageBackground resizeMode="contain" source={GiveClassesBgImg} style={styles.content}>
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>Para começar, você precisa se cadastrar como professor na nossa plataforma web.</Text>
      </ImageBackground>
      <RectButton onPress={handleNavigateToHomePage} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;
