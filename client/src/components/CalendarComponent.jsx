import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'dayjs/locale/es';

dayjs.locale('es');

const localizer = dayjsLocalizer(dayjs);

const CalendarComponent = ({ events, onSelectEvent }) => {
    const eventStyle = (event) => {
        let backgroundColor = '';
        switch (event.status) {
            case 'accepted':
                backgroundColor = 'orange';
                break;
            case 'canceled':
                backgroundColor = 'red';
                break;
            case 'completed':
                backgroundColor = 'green';
                break;
            case 'confirmed':
                backgroundColor = 'lightgreen';
                break;
            case 'pending':
                backgroundColor = 'lightsalmon';
                break;
            case 'rejected':
                backgroundColor = 'lightcoral';
                break;
            default:
                backgroundColor = 'white';
        }
        return {
            style: {
                backgroundColor,
            },
        };
    };

    const dayStyle = (date) => {
        const day = date.getDay();
        let backgroundColor = '';

        if (day === 0) {
            backgroundColor = 'lightcoral';
        } else if (day === 6) {
            backgroundColor = 'lightgray';
        } else {
            backgroundColor = 'white';
        }

        return {
            style: {
                backgroundColor,
            },
        };
    };

    return (
        <div className='calendar'>
            <Calendar
                formats={{
                    dayHeaderFormat: (date) => {
                        return dayjs(date).format('DD/MM/YYYY');
                    },
                }}
                messages={{
                    next: '+',
                    previous: '-',
                    today: 'Hoy',
                    month: 'Mes',
                    week: 'Semana',
                    day: 'Día',
                }}
                localizer={localizer}
                events={events}
                views={['month', 'week', 'day']}
                onSelectEvent={onSelectEvent}
                eventPropGetter={eventStyle}
                dayPropGetter={dayStyle}
            />
        </div>
    );
};

export default CalendarComponent;
