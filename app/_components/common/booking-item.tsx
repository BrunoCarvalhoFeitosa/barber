"use client"
import { Prisma } from "@prisma/client"
import { isFuture } from "date-fns"
import { Sheet } from "@/app/_components/ui/sheet"
import { BookingItemTrigger } from "@/app/_components/common/booking-item-trigger"
import { BookingItemContent } from "@/app/_components/common/booking-item-content"

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true
            barbershop: true
        }
    }>
}

export const BookingItem = ({ booking }: BookingItemProps) => {
    const isBookingConfirmed = isFuture(booking.date)

    return (
        <Sheet>
            <BookingItemTrigger isBookingConfirmed={isBookingConfirmed} booking={booking} />
            <BookingItemContent isBookingConfirmed={isBookingConfirmed} booking={booking} />
        </Sheet>
    )
}