"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/app/_lib/prisma"
import { redirect } from "next/navigation"
import { BarbershopImage } from "@/app/_components/barbershopPage/barbershop-image"
import { BarbershopResume } from "@/app/_components/barbershopPage/barbershop-resume"
import { BarbershopServices } from "@/app/_components/barbershopPage/barbershop-services"

interface BarbershopPageProps {
    params: {
        id: string
    }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
    const session = await getServerSession(authOptions)

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include: {
            services: true
        }
    })

    if (!params.id || !barbershop) {
        return redirect("/404")
    }

    return (
        <main>
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
        </main>
    )
}
 
export default BarbershopPage