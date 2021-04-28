import './styles.css';
import api from '../../services/api';
import React from 'react';
import WhatsAppIcon from '../../assests/images/icons/whatsapp.svg';

export interface TeacherProps {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: number;
  bio: string;
}

interface TeacherItemProps {
  teacher: TeacherProps;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post('connections', { user_id: teacher.id });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <div className="teacher-about">{teacher.bio}</div>
      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a href={`https://wa.me/55${teacher.whatsapp}`} rel="noopener noreferrer" target="_blank" onClick={createNewConnection}>
          <img src={WhatsAppIcon} alt="" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
