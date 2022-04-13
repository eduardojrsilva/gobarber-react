import React, { useCallback, /*useEffect,*/ useMemo, useState } from 'react';
import DayPicker, { DayModifiers, ModifiersUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { ptBR } from 'date-fns/locale'
import { isToday, format, parseISO, isAfter } from 'date-fns';

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

interface AppointmentData {
  id: string
  date: string
  hourFormatted: string
  user: {
    name: string
    avatar_url: string
  }
}

const fakeAppointments: AppointmentData[] = [
  {
    id: '46545',
    date: "2022-04-13T13:00:00.000Z",
    hourFormatted: "",
    user: {
      name: 'Edu',
      avatar_url: "https://avatars.githubusercontent.com/u/81584638?v=4",
    }
  },
  {
    id: '46545',
    date: "2022-04-13T17:00:00.000Z",
    hourFormatted: "",
    user: {
      name: 'Bat',
      avatar_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_cmS706xd4mbzo8I-mbYd8YDviGyzKGX4lQ&usqp=CAU",
    }
  },
];

fakeAppointments.forEach(fa => {
  fa.hourFormatted = format(parseISO(fa.date), 'HH:mm')
})

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);
  
  const [appointments, setAppointments] = useState<AppointmentData[]>(fakeAppointments);

  const { signOut, user } = useAuth();

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

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12
    });
  }, [appointments])

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12
    });
  }, [appointments])

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments])


  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile"><strong>{user.name}</strong></Link>
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

          {isToday(selectedDate as Date) && nextAppointment && (
            <NextAppointment>
              <strong>Atendimento a seguir</strong>
              <div>
                <img src={nextAppointment.user.avatar_url} alt={nextAppointment.user.name} />

                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
              <p>Nenhum agendamento nesse período</p>
            )}

            {morningAppointments.map(appointment => (
            <Appointment>
              <span>
                <FiClock />
                {appointment.hourFormatted}
              </span>

              <div>
                <img src={appointment.user.avatar_url} alt={appointment.user.name} />

                <strong>{appointment.user.name}</strong>
              </div>
            </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
              <p>Nenhum agendamento nesse período</p>
            )}

            {afternoonAppointments.map(appointment => (
              <Appointment>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img src={appointment.user.avatar_url} alt={appointment.user.name} />
                  
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
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