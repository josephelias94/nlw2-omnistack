import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  function listFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);

        setFavorites(favoritedTeachers);
      }
    });
  }

  useFocusEffect(() => {
    listFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys Favoritos" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} favorited={true} />;
        })}
      </ScrollView>
    </View>
  );
}

export default Favorites;
