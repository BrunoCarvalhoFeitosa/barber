import { Prisma } from "@prisma/client"
import { BookingItem } from "@/app/_components/common/booking-item"

interface BookingsProps {
    title: string
    isFinished?: boolean
    bookings: Prisma.BookingGetPayload<{
        include: {
            service: true
            barbershop: true
        }
    }>[]
}

export const Bookings = async ({ title, isFinished, bookings }: BookingsProps) => {
    return (
        <section className="pb-6 px-5">
            <div className={`${isFinished ? "opacity-50": "opacity-100"}`}>
                <div className="mb-2">
                    {bookings.length >= 1 && (
                        <h2 className="text-lg font-normal uppercase text-gray-400">
                            {title}
                        </h2>
                    )}
                    {!bookings.length && title !=="Finalizados" && (
                        <h2 className="text-sm">
                            Nenhum agendamento pendente.
                        </h2>
                    )}
                </div>
                {bookings.length >= 1 && (        
                    <div className="flex flex-col gap-3">
                        {bookings.map((booking) => (
                            <BookingItem key={booking.id} booking={booking} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}