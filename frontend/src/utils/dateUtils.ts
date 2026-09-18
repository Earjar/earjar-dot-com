export const formatToLocalDateTime = (dt: any) => {
    const full_date = new Date(dt).toLocaleDateString();
    const full_time = new Date(dt).toLocaleTimeString();
    return `${full_date} ${full_time}`
};
export const formatRelativeDate = (dt: any): string => {
    const date = new Date(dt);
    const today = new Date();

    const resetTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const dateOnly = resetTime(date);
    const todayOnly = resetTime(today);

    const diffTime = todayOnly.getTime() - dateOnly.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    const options: Intl.DateTimeFormatOptions = { second: "numeric", minute: "numeric", hour: "numeric", day: "numeric", month: "long", year: "numeric" };

    if (diffDays === 0) {
        return `Today, ${date.toLocaleDateString(undefined, options)}`;
    } else if (diffDays === 1) {
        return `Yesterday, ${date.toLocaleDateString(undefined, options)}`;
    } else {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + 1);
        startOfWeek.setHours(0, 0, 0, 0);

        const startOfLastWeek = new Date(startOfWeek);
        startOfLastWeek.setDate(startOfWeek.getDate() - 7);

        if (date >= startOfWeek) {
            return `This Week, ${date.toLocaleDateString(undefined, options)}`;
        } else if (date >= startOfLastWeek && date < startOfWeek) {
            return `Last Week, ${date.toLocaleDateString(undefined, options)}`;
        } else {
            return `Past, ${date.toLocaleDateString(undefined, options)}`;
        }
    }
};
export const formatToReadable = (value: number | null, format: string = "seconds") => {
    if (!value) return '---';

    switch (format) {
        case "seconds":
            // const hours = value > 3600 ? Math.round(value / 60) : 0;
            const minutes = value >= 60 ? Math.round(value / 60) : 0;
            const seconds = value >= 60 ? Math.round(value % 60) : value;

            if (value <= 59) {
                return `${value}s`
            } else if (value <= 3599) {

                return `${minutes}m ${seconds}s`;
            } else {
                return ``;
            }
            ;

        default: return value;
    }
    // note 
};
export const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
};
const toSADate = (dt: Date): Date => {
    // Convert to South Africa Standard Time (UTC+2)
    const saTime = new Date(dt.toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" }));
    saTime.setHours(0, 0, 0, 0);
    return saTime;
};
export const isPastDate = (dt: Date): boolean => {
    const today = toSADate(new Date());
    const closingDate = toSADate(new Date(dt));
    return closingDate < today;
};
