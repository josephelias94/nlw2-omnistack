import React, { useState } from 'react';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import HeartOutlineIcon from '../../images/icons/heart-outline.png';
import unfavoriteIcon from '../../images/icons/unfavorite.png';
import whatsappIcon from '../../images/icons/whatsapp.png';
import { Image, Linking, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';

export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  function handleLinkToWhatsapp() {
    api.post('/connections', {
      user_id: teacher.id,
    });
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }

  async function handleToggleFavorites() {
    const favorites = await AsyncStorage.getItem('favorites');

    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoritedIndex = favoritesArray.map((teacherItem: Teacher) => {
        return teacher.id === teacherItem.id;
      });

      favoritesArray.splice(favoritedIndex, 1);
      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);

      setIsFavorited(true);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: teacher.avatar }} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/Hora {'   '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton onPress={handleToggleFavorites} style={[styles.favoriteButton, isFavorited ? styles.unfavoriteButton : {}]}>
            {isFavorited ? <Image source={unfavoriteIcon} /> : <Image source={HeartOutlineIcon} />}
          </RectButton>
          <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
