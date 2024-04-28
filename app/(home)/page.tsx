import { getServerSession } from "next-auth"
import { db } from "@/app/_lib/prisma"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Header } from "@/app/_components/common/header"
import { Search } from "@/app/_components/homePage/search"
import { Barbershop } from "@/app/_components/homePage/barbershop"
import { Bookings } from "@/app/_components/homePage/bookings"

const HomePage = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        return redirect("/")
    }

    const confirmedBookings = session?.user ? await db.booking.findMany({
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
    }) : []

    return (
        <div>
            <Header />
            <main className="pb-14">
                <Search />
                <Bookings bookings={confirmedBookings} />
                <Barbershop title="Recomendados" />
                <Barbershop title="Populares" />
            </main>
        </div>
    )
}

export default HomePage