import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';

const Calendars = () => {
    const localaizer = dayjsLocalizer(dayjs);
    return (
        <>
            <div
                style={{
                    height: '500px',
                    width: '75vw',
                }}
            >
                <Calendar localizer={localaizer} />
            </div>
        </>
    );
};

export default Calendars;
