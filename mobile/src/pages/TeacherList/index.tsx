import React, { useState } from 'react';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { ScrollView, Text, TextInput, View } from 'react-native';
import styles from './styles';

function TeacherList() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [time, setTime] = useState('');
  const [week_day, setWeekDay] = useState('');

  function listFavorites() {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        });

        setFavorites(favoritedTeachersId);
      }
    });
  }

  function handleToggleFiltersVisible() {
    setFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    listFavorites();
    const response = await api.get('/classes', {
      params: {
        week_day,
        subject,
        time,
      },
    });
    setTeachers(response.data);
    setFiltersVisible(!isFiltersVisible);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys Disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" color="#fff" size={24} />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={(text) => setSubject(text)}
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                  value={week_day}
                  onChangeText={(text) => setWeekDay(text)}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual a hora?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={(text) => setTime(text)}
                />
              </View>
            </View>
            <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />;
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
