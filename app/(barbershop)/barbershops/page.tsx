import { redirect } from "next/navigation"
import { db } from "@/app/_lib/prisma"
import { Header } from "@/app/_components/common/header"
import { BarbershopSearchedTitle } from "./_components/barbershop-searched-title"
import { BarbershopSearchedItem } from "./_components/barbershop-searched-item"
import { Search } from "@/app/(home)/_components/search"

interface BarbershopsPageProps {
    searchParams: {
        search?: string
    }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
    if (!searchParams.search) {
        return redirect("/")
    }

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
                <Search defaultValues={{ term: searchParams.search }} />
                <BarbershopSearchedTitle searchParams={searchParams.search} barbershops={barbershops} />
                <BarbershopSearchedItem barbershops={barbershops} />
            </main>
        </div>
    )
}

export default BarbershopsPage