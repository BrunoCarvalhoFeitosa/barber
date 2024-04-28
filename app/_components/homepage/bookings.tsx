"use client"
import Link from "next/link"
import { Booking } from "@prisma/client"
import { BookingItem } from "@/app/_components/common/booking-item"
import { Button } from "@/app/_components/ui/button"

interface BookingsProps {
    bookings: Booking[]
}

export const Bookings = ({ bookings }: BookingsProps) => {
    return (
        <section className="py-6 px-5">
            <div>
                <div className="mb-2">
                    <div className="flex flex-col">
                        <div>
                            <Link href="/bookings">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="default"
                                    className="p-0 underline hover:bg-transparent"
                                >
                                    Ver todos agendamentos
                                </Button>
                            </Link>
                        </div>
                        <div>
                            <h2 className="text-lg font-normal uppercase text-gray-400">
                                Agendamentos
                            </h2>
                        </div>
                    </div>
                    {!bookings.length && (
                        <p className="text-sm">
                            Não há agendamentos pendentes.
                        </p>
                    )}
                </div>
                <div className="pb-3 flex items-center gap-3 overflow-x-auto custom-scrollbar">
                    {bookings.map((booking: Booking) => (
                        <BookingItem key={booking.id} booking={booking} />
                    ))}
                </div>
            </div>
        </section>
    )
}