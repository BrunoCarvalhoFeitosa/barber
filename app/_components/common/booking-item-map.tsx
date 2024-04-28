"use client"
import { Prisma } from "@prisma/client"
import Image from "next/image"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"

interface BookingItemMapProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true
            barbershop: true
        }
    }>
}

export const BookingItemMap = ({ booking }: BookingItemMapProps) => {
    return (
        <div className="group mt-6 mx-auto relative w-[90%] h-[180px] overflow-hidden">
            <div>
                <div className="w-full">
                    <Image
                        fill
                        src="/images/map-image.png"
                        alt={booking.barbershop.name}
                        className="w-full transition-transform duration-300 scale-105 group-hover:scale-150"
                    />
                </div>
                <div className="absolute bottom-4 left-[50%] translate-x-[-50%] w-[85%]">
                    <Card className="w-full">
                        <CardContent className="flex items-center gap-2 p-3">
                            <div>
                                <Avatar>
                                    <AvatarImage
                                        src={booking.barbershop.imageUrl}
                                        alt={booking.barbershop.name}
                                        sizes="200"
                                    />
                                </Avatar>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold overflow-hidden text-nowrap text-ellipsis">
                                    {booking.barbershop.name}
                                </h3>
                                <h4 className="text-sm text-gray-400 overflow-hidden text-nowrap text-ellipsis">
                                    {booking.barbershop.address}
                                </h4>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}