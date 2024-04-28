"use client"
import { Prisma } from "@prisma/client"
import { SheetContent } from "@/app/_components/ui/sheet"
import { BookingItemTitle } from "@/app/_components/common/booking-item-title"
import { BookingItemMap } from "@/app/_components/common/booking-item-map"
import { BookingItemResume } from "@/app/_components/common/booking-item-resume"
import { BookingItemActions } from "@/app/_components/common/booking-item-actions"

interface BookingItemContenProps {
    isBookingConfirmed: boolean
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true
            barbershop: true
        }
    }>
}

export const BookingItemContent = ({ isBookingConfirmed, booking }: BookingItemContenProps) => {
    return (
        <SheetContent className="p-0">
            <BookingItemTitle />
            <BookingItemMap booking={booking} />
            <BookingItemResume isBookingConfirmed={isBookingConfirmed} booking={booking} />
            <BookingItemActions isBookingConfirmed={isBookingConfirmed} booking={booking} />
        </SheetContent>
    )
}