import { getServerSession } from "next-auth"
import { authOptions } from "@/app/_lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/app/_lib/prisma"
import { Header } from "@/app/_components/common/header"
import { BookingsTitle } from "./_components/bookings-title"
import { Bookings } from "./_components/bookings"

const BookingsPage = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        return redirect("/")
    }

    const [confirmedBookings, finishedBookings] = await Promise.all([
        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    gte: new Date()
                }
            },
            include: {
                service: true,
                barbershop: true
            }
        }),

        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    lt: new Date()
                }
            },
            include: {
                service: true,
                barbershop: true
            }
        })
    ])

    return (
        <div>
            <Header />
            <main>
                <BookingsTitle />
                <Bookings title="Confirmados" bookings={confirmedBookings} />
                <Bookings title="Finalizados" isFinished={true} bookings={finishedBookings} />
            </main>
        </div>
    )
}

export default BookingsPage