import { db } from "@/app/_lib/prisma"
import { Header } from "@/app/_components/common/header"
import { BarbershopSearchedTitle } from "./_components/barbershop-searched-title"
import { BarbershopSearchedItem } from "./_components/barbershop-searched-item"

interface BarbershopsPageProps {
    searchParams: {
        search?: string
    }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
    const barbershops = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams.search,
                mode: "insensitive"
            }
        }
    })
    
    return (
        <div>
            <Header />
            <main>
                <BarbershopSearchedTitle searchParams={searchParams.search} />
                <BarbershopSearchedItem barbershops={barbershops} />
            </main>
        </div>
    )
}

export default BarbershopsPage