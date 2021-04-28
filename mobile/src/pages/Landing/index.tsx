import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import giveClassesIcon from '../../images/icons/give-classes.png';
import heartIcon from '../../images/icons/heart.png';
import LandingImg from '../../images/landing.png';
import stydyIcon from '../../images/icons/study.png';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

function Landing() {
  const { navigate } = useNavigation();

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('/connections').then((response) => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  }, []);

  function handleNavigateToGiveClassesPage() {
    navigate('GiveClasses');
  }

  function handleNavigateToStudyPages() {
    navigate('Study');
  }

  return (
    <View style={styles.container}>
      <Image source={LandingImg} style={styles.banner} />
      <Text style={styles.title}>
        Seja bem-vindo,{'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>
      <View style={styles.buttonsContainer}>
        <RectButton onPress={handleNavigateToStudyPages} style={[styles.button, styles.buttonPrimary]}>
          <Image source={stydyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
        <RectButton onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>
      <Text style={styles.connections}>
        Total de {totalConnections} conexões já realizadas <Image source={heartIcon} />
      </Text>
    </View>
  );
}

export default Landing;
