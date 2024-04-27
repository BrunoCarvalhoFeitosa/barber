"use client"
import Image from "next/image"
import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Badge } from "@/app/_components/ui/badge"
import { Button } from "@/app/_components/ui/button"
import { StarIcon } from "lucide-react"

interface BarberShopItemProps {
    barbershop: Barbershop
}

export const BarberShopItem = ({ barbershop }: BarberShopItemProps) => {
    return (
        <Card className="mb-3 min-w-[200px] max-w-[200px] rounded-2xl overflow-hidden">
            <CardContent className="relative p-0">
                <div className="absolute top-3 left-3 z-10">
                    <Badge variant="secondary" className="flex items-center gap-1 top-3 left-3 opacity-90">
                        <StarIcon className="fill-primary text-primary" size={12} />
                        <span className="text-xs">5.0</span>
                    </Badge>
                </div>
                <div className="overflow-hidden">
                    <Image
                        src={barbershop.imageUrl}
                        alt={barbershop.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-[159px] rounded-tl-2xl rounded-tr-2xl object-cover transition-transform duration-200 hover:scale-125 cursor-zoom-in"
                    />
                </div>
                <div className="p-3 pb-4">
                    <div className="mb-2">
                        <h3 className="text-sm font-bold">
                            {barbershop.name}
                        </h3>
                        <p className="text-xs text-gray-400 overflow-hidden text-ellipsis text-nowrap">
                            {barbershop.address}
                        </p>
                    </div>
                    <div>
                        <Button className="w-full" variant="secondary">
                            Reservar
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}