"use client"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { Barbershop, Booking, Service } from "@prisma/client"
import { saveBooking } from "@/app/_actions/save-booking"
import { getDayBookings } from "@/app/_actions/get-day-bookings"
import { toast } from "sonner"
import { format, setHours, setMinutes } from "date-fns"
import { ptBR } from "date-fns/locale"
import { generateDayTimeList } from "@/app/_helpers/hours"
import Image from "next/image"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet"
import { Calendar } from "@/app/_components/ui/calendar"
import { Loader2Icon } from "lucide-react"

interface BarbershopServiceItemProps {
    service: Service
    barbershop: Barbershop
    isAuthenticated?: boolean
}

export const BarbershopServiceItem = ({ service, barbershop, isAuthenticated }: BarbershopServiceItemProps) => {
    const { data } = useSession()
    const router = useRouter()
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [hour, setHour] = useState<string | undefined>()
    const [submitIsLoading, setSubmitIsLoading] = useState<boolean>(false)
    const [sheetIsOpen, setSheetIsOpen] = useState<boolean>(false)
    const [dayBookings, setDayBookings] = useState<Booking[]>([])

    const handleDateClick = (date: Date | undefined) => {
        setDate(date)
        setHour(undefined)
      }

    const handleHourClick = (time: string) => {
        setHour(time)
    }
    
    const handleBookingServiceClick = async () => {
        if (!isAuthenticated) {
            return await signIn("google")
        }
    }

    const handleBookingSubmitClick = async () => {
        setSubmitIsLoading(true)

        try {
            if (!hour || !date || !data?.user) {
                return
            }

            const dateHours = Number(hour.split(":")[0])
            const dateMinutes = Number(hour.split(":")[1])
            const formattedDate = setMinutes(setHours(date, dateHours), dateMinutes)

            await saveBooking({
                barbershopId: barbershop.id,
                serviceId: service.id,
                date: formattedDate,
                userId: (data.user as any).id
            })

            setSheetIsOpen(false)
            setHour(undefined)
            setDate(undefined)
            toast("Reserva realizado com sucesso.", {
                description: format(formattedDate, "'para' dd 'de' MMMM 'às' HH':'mm'.'", {
                    locale: ptBR
                }),
                action: {
                    label: "Visualizar",
                    onClick: () => router.push("/bookings")
                }
            })
        } catch (error) {
            console.error("Error while save booking", error)
        } finally {
            setSubmitIsLoading(false)
        }
    }

    const timeList = useMemo(() => {
        if (!date) {
            return []
        }

        return generateDayTimeList(date).filter(time => {
            const timeHour = Number(time.split(":")[0])

            const timeMinutes = Number(time.split(":")[1])

            const booking = dayBookings.find(booking => {
                const bookingHour = booking.date.getHours()
                const bookingMinutes = booking.date.getMinutes()

                return bookingHour === timeHour && bookingMinutes === timeMinutes
            })

            if (!booking) {
                return true
            }

            return false
        })
    }, [date, dayBookings])

    useEffect(() => {
        if (!date) {
            return
        }

        const refreshAvailableHours = async () => {
            const bookedDays = await getDayBookings(barbershop.id, date)

            setDayBookings(bookedDays)
        }

        refreshAvailableHours()
    }, [date])

    return (
        <Card className="md:min-w-[400px]">
            <CardContent className="p-4 flex items-center gap-4 md:gap-6 w-full">
                <div className="relative w-[100px] h-[100px] rounded-2xl overflow-hidden">
                    <Image
                        fill
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-full h-full object-cover rounded-2xl transition-transform duration-300 hover:scale-125 cursor-zoom-in"
                    />
                </div>
                <div className="flex-1">
                    <div className="mb-3">
                        <h3 className="text-lg font-bold">
                            {service.name}
                        </h3>
                        <p className="text-sm">
                            {service.description}
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold text-primary">
                            {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                            }).format(Number(service.price))}
                        </h4>
                        <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="default"
                                    className={`${!isAuthenticated && "border border-red-700 text-red-500 cursor-not-allowed"}`}
                                    onClick={handleBookingServiceClick}
                                >
                                    Reservar
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="p-0">
                                <SheetHeader className="py-6 px-5 text-left border-b border-solid border-secondary">
                                    <SheetTitle>
                                        Fazer reserva
                                    </SheetTitle>
                                </SheetHeader>
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={handleDateClick}
                                    locale={ptBR}
                                    fromDate={new Date()}
                                    className="mt-6"
                                    styles={{
                                        head_cell: {
                                            width: "100%",
                                            textTransform: "capitalize"
                                        },
                                        cell: {
                                            width: "100%"
                                        },
                                        button: {
                                            width: "100%"
                                        },
                                        nav_button_previous: {
                                            width: "32px",
                                            height: "32px"
                                        },
                                        nav_button_next: {
                                            width: "32px",
                                            height: "32px"
                                        },
                                        caption: {
                                            width: "100%",
                                            textTransform: "capitalize"
                                        },
                                        caption_end: {
                                            width: "100%"
                                        },
                                        
                                    }}
                                />
                                {date && (
                                    <div className="py-6 px-5 border-t border-solid border-secondary">
                                        <div className="pb-3 flex items-center gap-3 overflow-x-auto custom-scrollbar">
                                            {timeList.map((time) => (
                                                <Button
                                                    key={time}
                                                    type="button"
                                                    variant={hour === time ? "default" : "outline"}
                                                    size="default"
                                                    className="rounded-full"
                                                    onClick={() => handleHourClick(time)}
                                                >
                                                    {time}
                                                </Button>
                                            ))}
                                        </div>
                                    </div> 
                                )}
                                <div className="py-8 px-5 border-t border-solid border-secondary">
                                    <Card>
                                        <CardContent className="p-3">
                                            {service.name && (
                                                <div className="flex justify-between">
                                                    <h4 className="text-base font-bold">
                                                        {service.name}
                                                    </h4>
                                                    <h5 className="text-base font-bold">
                                                        {Intl.NumberFormat("pt-BR", {
                                                            style: "currency",
                                                            currency: "BRL"
                                                        }).format(Number(service.price))}
                                                    </h5>
                                                </div>
                                            )}
                                            {date && (
                                                <div className="flex justify-between my-2 text-sm text-gray-400">
                                                    <h4>
                                                        Data
                                                    </h4>
                                                    <p>
                                                        {format(date, "dd 'de' MMMM", {
                                                            locale: ptBR
                                                        })}
                                                    </p>
                                                </div>
                                            )}
                                            {hour && (
                                                <div className="mb-2 flex justify-between text-sm text-gray-400">
                                                    <h4>
                                                        Horário
                                                    </h4>
                                                    <p>
                                                        {hour}
                                                    </p>
                                                </div>
                                            )}
                                            {hour && (
                                                <div className="mb-2 flex justify-between text-sm text-gray-400">
                                                    <h4 className="text-sm text-gray-400">
                                                        Barbearia
                                                    </h4>
                                                    <p className="text-sm">
                                                        {barbershop.name}
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                                <SheetFooter className="px-5 w-full">
                                    <div className={`w-full ${!date || !hour || !data?.user ? "cursor-not-allowed" : "cursor-pointer"}`}>
                                        <Button
                                            type="button"
                                            variant={!date || !hour || !data?.user ? "outline" : "default"}
                                            size="lg"
                                            className={`flex items-center gap-1 w-full border border-red-700 text-red-500 pointer-events-none ${date && hour && "border border-primary text-white pointer-events-auto"}`}
                                            onClick={handleBookingSubmitClick}
                                        >
                                            {submitIsLoading && (
                                                <Loader2Icon className="w-4 h-4 animate-spin" />
                                            )}
                                            <span>
                                                Confirmar reserva
                                            </span>
                                        </Button>
                                    </div>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}