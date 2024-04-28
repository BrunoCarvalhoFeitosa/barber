"use client"
import { Booking } from "@prisma/client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingItemDateProps {
    booking: Booking
}

export const BookingItemDate = ({ booking }: BookingItemDateProps) => {
    return (
        <div className="pl-6 md:pl-8 flex flex-col justify-center items-center border-l border-solid border-secondary">
            <p className="text-xs">
                {format(booking.date, "MMMM", {
                    locale: ptBR
                })}
            </p>
            <p className="text-2xl md:text-4xl">
                {format(booking.date, "dd")}
            </p>
            <p className="text-sm md:text-lg">
                {format(booking.date, "hh:mm")}
            </p>
        </div>
    )
}