import {getSchedule} from '../google-sheets-api/getContent'

const Schedule = async () => {
    const schedule = await getSchedule()
    return (
        <>
        {schedule?.map((value, index) => (
            <div key={index} className="pb-1 md:pb-2">
                {/* event and time in array */}
                <span>{value[0]} {value[1]}</span>
            </div>
        ))}
        </>
    )
}

export default Schedule