"use client"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { SearchIcon } from "lucide-react"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"

export const Search = () => {
    return (
        <section className="p-5">
            <div>
                <h2 className="text-xl">
                    Olá, <strong>Bruno!</strong>
                </h2>
                <div className="flex items-center gap-x-1 text-sm">
                    <p className="capitalize">
                        {format(new Date(), "EEEE','", {
                            locale: ptBR
                        })}
                    </p>
                    <p>
                        {format(new Date(), "dd 'de' MMMM", {
                            locale: ptBR
                        })}
                    </p>
                </div>
            </div>
            <div className="mt-6 flex items-center gap-4">
                <Input
                    placeholder="Busque por uma barbearia..."
                    className="h-12 md:h-14 focus-visible:ring-offset-0 focus-visible:ring-0 placeholder:text-[#555]"
                />
                <Button
                    variant="default"
                    size="lg"
                    className="h-12 md:h-14"
                >
                    <SearchIcon size={20} />
                </Button>
            </div>
        </section>
    )
}