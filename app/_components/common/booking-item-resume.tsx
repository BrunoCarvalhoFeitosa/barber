"use client"
import { Prisma } from "@prisma/client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Badge } from "@/app/_components/ui/badge"
import { Card, CardContent } from "@/app/_components/ui/card"

interface BookingItemResumeProps {
    isBookingConfirmed: boolean
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true
            barbershop: true
        }
    }>
}

export const BookingItemResume = ({ isBookingConfirmed, booking }: BookingItemResumeProps) => {
    return (
        <div className="pt-6 pb-0 px-5">
            <div className="mt-2 mb-6">
                <Badge
                    variant={isBookingConfirmed ? "default" : "secondary"}
                    className="py-[5px] px-3"
                >
                    {isBookingConfirmed ? "Confirmado" : "Finalizado"}
                </Badge>
                <Card className="mt-4">
                    <CardContent className="p-3">
                        {booking.service.name && (
                            <div className="flex justify-between">
                                <h4 className="text-base font-bold">
                                    {booking.service.name}
                                </h4>
                                <h5 className="text-base font-bold">
                                    {Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    }).format(Number(booking.service.price))}
                                </h5>
                            </div>
                        )}
                        <div className="flex justify-between my-2 text-sm text-gray-400">
                            <h4>
                                Data
                            </h4>
                            <p>
                                {format(booking.date, "dd 'de' MMMM", {
                                    locale: ptBR
                                })}
                            </p>
                        </div>
                        <div className="mb-2 flex justify-between text-sm text-gray-400">
                            <h4>
                                Horário
                            </h4>
                            <p>
                                {format(booking.date, "hh:mm")}
                            </p>
                        </div>
                        <div className="mb-2 flex justify-between text-sm text-gray-400">
                            <h4 className="text-sm text-gray-400">
                                Barbearia
                            </h4>
                            <p className="text-sm">
                                {booking.barbershop.name}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}