"use client"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Badge } from "@/app/_components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/_components/ui/avatar"

interface BookingItemProps {
    title: string
}

export const BookingItem = ({ title }: BookingItemProps) => {
    return (
        <section className="px-5 mt-6">
            <div className="mb-2">
                <h2 className="text-lg font-normal uppercase text-gray-400">
                    {title}
                </h2>
            </div>
            <Card className="py-4 md:p-5">
                <CardContent className="px-4 flex flex-row justify-between items-center gap-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <Avatar className="w-12 h-12 md:w-24 md:h-24 overflow-hidden">
                                <AvatarImage
                                    src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png"
                                    className="transition-transform duration-200 hover:scale-125 cursor-zoom-in"
                                />
                                <AvatarFallback>
                                    Foto
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="font-bold leading-none">
                                    Corte de cabelo
                                </h2>
                                <h3 className="text-sm md:text-2xl leading-none">
                                    Vintage Culture
                                </h3>
                                <div className="mt-2 w-fit">
                                    <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] py-[5px] px-3">
                                        Confirmado
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pl-6 md:pl-8 flex flex-col justify-center items-center border-l border-solid border-secondary">
                        <p className="text-xs">
                            Fevereiro
                        </p>
                        <p className="text-2xl md:text-4xl">
                            06
                        </p>
                        <p className="text-sm md:text-lg">
                            09:45
                        </p>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}