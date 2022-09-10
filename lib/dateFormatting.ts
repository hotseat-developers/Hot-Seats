import { DateTime } from 'luxon'

export default function formatDate(dbTimestamp: string) {
    return DateTime
        .fromISO(dbTimestamp, { zone: 'utc'})
        .setZone('local')
        .toLocaleString(DateTime.TIME_SIMPLE)
}
