import api from '../../services/api';
import Input from '../../components/Input';
import MagnifierIcon from '../../assests/images/icons/search.svg';
import PurpleHeader from '../../components/PurpleHeader';
import React, { useState, FormEvent } from 'react';
import Select from '../../components/Select';
import TeacherItem, { TeacherProps } from '../../components/TeacherItem';
import './styles.css';

function TeacherList() {
  const [subject, setSubject] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [time, setTime] = useState('');
  const [week_day, setWeekDay] = useState('');

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('classes', { params: { subject, week_day, time } });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PurpleHeader title="Estes são os proffys disponíveis.">
        <form id="search-teacher" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação física', label: 'Educação física' },
              { value: 'Física', label: 'Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' },
            ]}
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
          />
          <Input
            name="time"
            label="Horário"
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />
          <button type="submit">
            <img src={MagnifierIcon} alt="" />
          </button>
        </form>
      </PurpleHeader>
      <main>
        {teachers.map((teacher: TeacherProps) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
}

export default TeacherList;
