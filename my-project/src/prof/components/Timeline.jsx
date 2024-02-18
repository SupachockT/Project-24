import DayDiv from "./DayDiv";
import TimelineBlock from "./TimeLineBlock";

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 8; hour < 20; hour++) {
        for (let minute = 0; minute < 60; minute += 60) {
            const formattedHour = hour.toString().padStart(2, '0');
            const formattedMinute = minute.toString().padStart(2, '0');
            timeSlots.push(`${formattedHour}:${formattedMinute}`);
        }
    }
    return timeSlots;
};

export default function Timeline() {
    const timeSlots = generateTimeSlots();

    return (
        <div className='overflow-x-auto border mx-1 rounded-lg bg-gray-800'>
            <div>
                {/* Times row */}
                <div className="grid grid-cols-26">
                    <div className="border py-1 pl-1 col-span-2 dark:text-white dark:border-gray-700">
                        Day/Time
                    </div>
                    {timeSlots.map((timeSlot, index) => (
                        <div key={index} className="border py-1 pl-1 col-span-2 dark:text-white dark:border-gray-700">
                            {timeSlot}
                        </div>
                    ))}
                </div>
                {/* Days row */}
                <div className="grid grid-cols-26 min-h-4 md:min-h-12 border dark:border-gray-700">
                    <DayDiv DayText={daysOfWeek[0]} colorStyle={'bg-yellow-200'} />
                    <TimelineBlock startHour={'col-start-5'} endHour={'col-end-11'} />
                    <TimelineBlock startHour={'col-start-13'} endHour={'col-end-19'} />
                </div>

                <div className="grid grid-cols-26 min-h-4 md:min-h-12 border dark:border-gray-700">
                    <DayDiv DayText={daysOfWeek[1]} colorStyle={'bg-pink-400'} />
                </div>

                <div className="grid grid-cols-26 min-h-4 md:min-h-12 border dark:border-gray-700">
                    <DayDiv DayText={daysOfWeek[2]} colorStyle={'bg-green-400'} />
                </div>

                <div className="grid grid-cols-26 min-h-4 md:min-h-12 border dark:border-gray-700">
                    <DayDiv DayText={daysOfWeek[3]} colorStyle={'bg-orange-400'} />
                </div>

                <div className="grid grid-cols-26 min-h-4 md:min-h-12 border dark:border-gray-700">
                    <DayDiv DayText={daysOfWeek[4]} colorStyle={'bg-blue-400'} />
                </div>

                <div className="grid grid-cols-26 min-h-4 md:min-h-12 border dark:border-gray-700">
                    <DayDiv DayText={daysOfWeek[5]} colorStyle={'bg-purple-400'} />
                </div>

                <div className="grid grid-cols-26 min-h-4 md:min-h-12 border dark:border-gray-700">
                    <DayDiv DayText={daysOfWeek[6]} colorStyle={'bg-red-400'} />
                </div>
            </div>
        </div>
    );
};

