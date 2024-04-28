"use client"
import { useState } from "react"
import { toast } from "sonner"
import { Booking } from "@prisma/client"
import { cancelBooking } from "@/app/_actions/cancel-booking"
import { Button } from "@/app/_components/ui/button"
import { SheetClose, SheetFooter } from "@/app/_components/ui/sheet"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog"
import { Loader2Icon } from "lucide-react"

interface BookintItemActionsProps {
    isBookingConfirmed: boolean
    booking: Booking
}

export const BookingItemActions = ({ isBookingConfirmed, booking }: BookintItemActionsProps) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

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
        <div className="px-5">
            <SheetFooter className="flex flex-col gap-3 md:gap-0 md:flex-row">
                <SheetClose asChild>
                    <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        className="w-full"
                    >
                        Voltar
                    </Button>
                </SheetClose>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        {isBookingConfirmed && (
                            <Button
                                type="button"
                                variant="destructive"
                                size="lg"
                                className="flex items-center gap-2"
                            >
                                Cancelar reserva
                            </Button>
                        )}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Quer mesmo cancelar esta reserva?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                                Esta ação não poderá ser desfeita. Os dados 
                                serão removidos para sempre do nosso banco
                                de dados.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="w-full">
                                Voltar
                            </AlertDialogCancel>
                            <AlertDialogAction
                                className="flex items-center gap-2 w-full"
                                onClick={() => handleCancelBookingClick(booking.id)}
                            >
                                {isDeleteLoading && (
                                    <Loader2Icon className="w-4 h-4 animate-spin" />
                                )}
                                <span>
                                    Confirmar cancelamento
                                </span>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SheetFooter>
        </div>
    )
}