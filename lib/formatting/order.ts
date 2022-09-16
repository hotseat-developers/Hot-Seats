export default function formatOrder(orderId: number | string): string {
    return orderId.toString().padStart(3, '0')
}
