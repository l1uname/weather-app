export default function formatDateCurrentWeather(date, timezone) {
    const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(utcTime + timezone * 1000);
    const formattedDate = adjustedDate.toLocaleDateString('en-US', {month: 'short', day: '2-digit'});
    const formattedTime = adjustedDate.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', hour12: true});
    return {formattedDate, formattedTime};
}