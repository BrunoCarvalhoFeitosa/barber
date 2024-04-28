import { getServerSession } from "next-auth"
import { db } from "@/app/_lib/prisma"
import { authOptions } from "@/app/_lib/auth"
import { Header } from "@/app/_components/common/header"
import { Search } from "@/app/_components/homePage/search"
import { Barbershops } from "@/app/_components/homePage/barbershop"
import { Bookings } from "@/app/_components/homePage/bookings"

const HomePage = async () => {
    const session = await getServerSession(authOptions)

    const [confirmedBookings, barbershops, recommendedBarbershops ] = await Promise.all([
        session?.user ? db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    gte: new Date(),
                },
            },
            include: {
                service: true,
                barbershop: true,
            },
        }) : Promise.resolve([]),

        db.barbershop.findMany({}),

        db.barbershop.findMany({
          orderBy: {
            id: "asc",
          },
        }),
      ])

    return (
        <div>
            <Header />
            <main className="pb-14">
                <Search />
                <Bookings bookings={confirmedBookings} />
                <Barbershops title="Recomendados" barbershops={barbershops} />
                <Barbershops title="Populares" barbershops={recommendedBarbershops} />
            </main>
        </div>
    )
}

export default HomePage