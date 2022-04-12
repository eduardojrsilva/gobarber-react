import React, { useCallback, /*useEffect,*/ useMemo, useState } from 'react';
import DayPicker, { DayModifiers, ModifiersUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { ptBR } from 'date-fns/locale'
import { isToday, format } from 'date-fns';

import { FiClock, FiPower } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile, Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
// import api from '../../services/api';
import { Link } from 'react-router-dom';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);

  const { signOut, /*user*/ } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  // useEffect(() => {
  //   api.get(`/providers/${user.id}/month-availability`, {
  //     // headers: {
  //     //   'Authorization': `Bearer token`
  //     // },
  //     params: {
  //       year: currentMonth.getFullYear(),
  //       month: currentMonth.getMonth() + 1,
  //     }
  //   }).then(response => {
  //     setMonthAvailability(response.data);
  //   });
  // }, [currentMonth, user.id]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
    .filter(monthDay => monthDay.available === false)
    .map(monthDay => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();

      const date = new Date(year, month, monthDay.day);
    });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate as Date, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate as Date, 'cccc', {locale: ptBR});
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            {/* <img src={user.avatar_url} alt={user.name} /> */}
            <img src="https://avatars.githubusercontent.com/u/81584638?v=4" alt="Eduardo Silva" />
            <div>
              <span>Bem-vindo,</span>
              {/* <Link><strong>{user.name}</strong></Link> */}
              <Link to="/profile"><strong>Eduardo</strong></Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate as Date) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src="https://avatars.githubusercontent.com/u/81584638?v=4" alt="Eduardo Silva" />

              <strong>Eduardo</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars.githubusercontent.com/u/81584638?v=4" alt="Eduardo Silva" />

                <strong>Eduardo</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars.githubusercontent.com/u/81584638?v=4" alt="Eduardo Silva" />
                
                <strong>Eduardo</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img src="https://avatars.githubusercontent.com/u/81584638?v=4" alt="Eduardo Silva" />
                
                <strong>Eduardo</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6]}]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;