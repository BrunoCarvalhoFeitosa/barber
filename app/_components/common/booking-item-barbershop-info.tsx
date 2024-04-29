"use client"
import { Prisma } from "@prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar"
import { Badge } from "@/app/_components/ui/badge"

interface BookingItemBarbershopInfoProps {
    isBookingConfirmed: boolean
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true
            barbershop: true
        }
    }>
}

export const BookingItemBarbershopInfo = ({ isBookingConfirmed, booking }: BookingItemBarbershopInfoProps) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar className="w-12 h-12 md:w-24 md:h-24 overflow-hidden">
                <AvatarImage
                    src={booking.barbershop.imageUrl}
                    alt={booking.barbershop.name}
                    className="object-cover transition-transform duration-200 group-hover:scale-125 cursor-zoom-in"
                />
                <AvatarFallback>
                    Foto
                </AvatarFallback>
            </Avatar>
            <div className="text-left">
                <h2 className="font-bold leading-none">
                    {booking.service.name}
                </h2>
                <h3 className="text-sm md:text-2xl leading-none">
                    {booking.barbershop.name}
                </h3>
                <div className="mt-2 w-fit">
                    <Badge
                        variant={isBookingConfirmed ? "default" : "secondary"}
                        className="py-[5px] px-3"
                    >
                        {isBookingConfirmed ? "Confirmado" : "Finalizado"}
                    </Badge>
                </div>
            </div>
        </div>
    )
}