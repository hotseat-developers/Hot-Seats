import { DateTime } from 'luxon'

export default function formatTime(dbTimestamp: string) {
    return DateTime
        .fromISO(dbTimestamp, { zone: 'utc'})
        .setZone('local')
        .toLocaleString(DateTime.TIME_SIMPLE)
}
