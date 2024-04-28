"use client"
import { SheetHeader, SheetTitle } from "@/app/_components/ui/sheet"

export const BookingItemTitle = () => {
    return (
        <SheetHeader className="py-6 px-5 border-b border-solid border-secondary text-left">
            <SheetTitle>
                Informações da reserva
            </SheetTitle>
        </SheetHeader>
    )
}