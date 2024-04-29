import { getServerSession } from "next-auth"
import { authOptions } from "@/app/_lib/auth"
import { db } from "@/app/_lib/prisma"
import { redirect } from "next/navigation"
import { BarbershopImage } from "./_components/barbershop-image"
import { BarbershopResume } from "./_components/barbershop-resume"
import { BarbershopServices } from "./_components/barbershop-services"
import { Barbershops } from "@/app/_components/common/barbershops"

interface BarbershopPageProps {
    params: {
        id: string
    }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
    const session = await getServerSession(authOptions)

    const [barbershop, barbershops] = await Promise.all([
        db.barbershop.findUnique({
            where: {
                id: params.id
            },
            include: {
                services: true
            }
        }),

        db.barbershop.findMany({})
    ])


    if (!params.id || !barbershop) {
        return redirect("/404")
    }

    return (
        <main className="pb-14">
            <BarbershopImage
                barbershopImageUrl={barbershop.imageUrl}
                barbershopName={barbershop.name}
            />
            <BarbershopResume
                barbershopName={barbershop.name}
                barbershopAddress={barbershop.address}
            />
            <BarbershopServices
                services={barbershop.services}
                barbershop={barbershop}
                isAuthenticated={!!session?.user}
            />
            <Barbershops
                title="Barbearias"
                barbershops={barbershops}
            />
        </main>
    )
}
 
export default BarbershopPage