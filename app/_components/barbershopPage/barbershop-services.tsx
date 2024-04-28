"use client"
import { Barbershop, Service } from "@prisma/client"
import { BarbershopServiceItem } from "@/app/_components/barbershopPage/barbershop-service-item"

interface BarbershopServicesProps {
    services: Service[]
    barbershop: Barbershop
    isAuthenticated?: boolean
}

export const BarbershopServices = ({ services, barbershop, isAuthenticated }: BarbershopServicesProps) => {
    return (
        <section className="p-5 pb-14">
            <div className="mb-2">
                <h2 className="text-lg font-normal uppercase text-gray-400">
                    Serviços
                </h2>
            </div>
            <div className="pb-3 flex flex-col md:flex-row gap-5 overflow-x-auto custom-scrollbar">
                {services.map((service: Service) => (
                    <BarbershopServiceItem
                        key={service.id}
                        service={service}
                        barbershop={barbershop}
                        isAuthenticated={isAuthenticated}
                    />
                ))}
            </div>
        </section>
    )
}