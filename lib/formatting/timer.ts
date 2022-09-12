import type { TimerResult } from 'react-timer-hook'

function addPadding(num?: number): string | undefined {
    if (typeof num !== 'undefined') {
        return num.toString().padStart(2, "0")
    } else {
        return '00'
    }
}

export default function formatTimer(value: number | TimerResult) {
    let [ hours, minutes, seconds ] = [0, 0, 0]
    if (typeof value === "number") {
        hours = Math.floor(value / 3600)
        minutes = Math.floor((value - hours * 3600) / 60)
        seconds = value - hours * 3600 - minutes * 60
    } else {
        // ({ hours, minutes, seconds } = value)
        hours = value.hours
        minutes = value.minutes
        seconds = value.seconds
    }
    console.log(hours, minutes, seconds)
    return `${addPadding(hours)}:${addPadding(minutes)}:${addPadding(seconds)}`
}
