"use client"
import { useState } from "react"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"
import { cancelBooking } from "@/app/_actions/cancel-booking"
import Image from "next/image"
import { Button } from "@/app/_components/ui/button"
import { Badge } from "@/app/_components/ui/badge"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet"
import { Loader2Icon } from "lucide-react"

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true
            barbershop: true
        }
    }>
}

export const BookingItem = ({ booking }: BookingItemProps) => {
    const [isDeleteLoding, setIsDeleteLoading] = useState<boolean>(false)
    const isBookingConfirmed = isFuture(booking.date)

    const handleCancelBookingClick = async (bookingId: string) => {
        setIsDeleteLoading(true)

        try {
            await cancelBooking(bookingId)
            toast.success("Reserva cancelada com sucesso.")
        } catch (error) {
            console.error("Error while cancel booking", error)
            toast.success("Erro ao cancelar reserva.")
        } finally {
            setIsDeleteLoading(false)
        }
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Card className="group min-w-[100%] md:min-w-[550px] py-4 md:p-5">
                    <CardContent className="px-4 flex flex-row justify-between items-center gap-3">
                        <div>
                            <div className="flex items-center gap-2">
                                <Avatar className="w-12 h-12 md:w-24 md:h-24 overflow-hidden">
                                    <AvatarImage
                                        src={booking?.barbershop?.imageUrl ?? ""}
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
                        </div>
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
                    </CardContent>
                </Card>
            </SheetTrigger>
            <SheetContent className="p-0">
                <div>
                    <SheetHeader className="py-6 px-5 border-b border-solid border-secondary text-left">
                        <SheetTitle>
                            Informações da Reserva
                        </SheetTitle>
                    </SheetHeader>
                </div>
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
                <div className="px-5">
                    <SheetFooter className="flex items-center gap-3">
                        <SheetClose asChild>
                            <Button
                                type="button"
                                variant="secondary"
                                size="lg"
                                className="flex-1 w-full"
                            >
                                Voltar
                            </Button>
                        </SheetClose>
                        {isBookingConfirmed && (
                            <Button
                                type="button"
                                variant="destructive"
                                size="lg"
                                className="flex items-center gap-2"
                                onClick={() => handleCancelBookingClick(booking.id)}
                            >
                                {isDeleteLoding && (
                                    <Loader2Icon className="w-4 h-4 animate-spin" />
                                )}
                                <span>
                                    Cancelar Reserva
                                </span>
                            </Button>
                        )}
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    )
}