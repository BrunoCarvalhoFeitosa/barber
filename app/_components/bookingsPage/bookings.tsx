import { Booking } from "@prisma/client"
import { BookingItem } from "@/app/_components/common/booking-item"

interface BookingsProps {
    title: string
    isFinished?: boolean
    bookings: Booking[]
}

export const Bookings = async ({ title, isFinished, bookings }: BookingsProps) => {
    console.log("bookings.length", bookings.length)
    
    return (
        <section className="py-6 px-5">
            <div className={`${isFinished ? "opacity-50": "opacity-100"}`}>
                <div className="mb-2">
                    <h2 className="text-lg font-normal uppercase text-gray-400">
                        {title}
                    </h2>
                    {!bookings.length && (
                        <p className="text-sm">
                            Não há agendamentos pendentes.
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-3">
                    {bookings.map((booking: Booking) => (
                        <BookingItem key={booking.id} booking={booking} />
                    ))}
                </div>
            </div>
        </section>
    )
}