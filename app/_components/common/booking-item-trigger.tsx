"use client"
import { Prisma } from "@prisma/client"
import { Card, CardContent } from "@/app/_components/ui/card"
import { SheetTrigger } from "@/app/_components/ui/sheet"
import { BookingItemBarbershopInfo } from "@/app/_components/common/booking-item-barbershop-info"
import { BookingItemDate } from "@/app/_components/common/booking-item-date"

interface BookingItemTriggerProps {
    isBookingConfirmed: boolean
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true
            barbershop: true
        }
    }>
}

export const BookingItemTrigger = ({ isBookingConfirmed, booking }: BookingItemTriggerProps) => {
    return (
        <SheetTrigger className="group min-w-[100%] md:min-w-[550px]">
            <Card className="py-4 md:p-5">
                <CardContent className="px-4 flex flex-row justify-between items-center gap-3">
                    <BookingItemBarbershopInfo isBookingConfirmed={isBookingConfirmed} booking={booking} />
                    <BookingItemDate booking={booking} />
                </CardContent>
            </Card>
        </SheetTrigger>
    )
}