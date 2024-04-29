"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form"
import { SearchIcon } from "lucide-react"

const formSchema = z.object({
    term: z.string().trim().min(2, "Mínimo de 2 carácteres.").max(50),
})

export const Search = () => {
    const { data } = useSession()
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          term: "",
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        router.push(`/barbershops?search=${data.term}`)
    }

    return (
        <section className="pt-10 p-5">
            <div>
                {data?.user ? (
                    <h2 className="text-xl">
                        Olá, <strong>{data.user.name}!</strong>
                    </h2>
                ) : (
                    <h2 className="text-xl">
                        Olá!
                    </h2>
                )}
                <div className="flex items-center gap-x-1 text-sm">
                    <p className="capitalize">
                        {format(new Date(), "EEEE','", {
                            locale: ptBR
                        })}
                    </p>
                    <p>
                        {format(new Date(), "dd 'de' MMMM", {
                            locale: ptBR
                        })}.
                    </p>
                </div>
            </div>
            <div className="mt-6">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex items-end gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="term"
                            render={({ field }) => (
                                <FormItem className="relative first:flex-1">
                                    <FormLabel>
                                        Digite o nome de uma barbearia
                                    </FormLabel>
                                    <FormControl className="flex items-center">
                                        <Input
                                            placeholder="Digite o nome de uma barbearia..."
                                            className="w-full h-12 md:h-14 placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="absolute -bottom-6 left-0 text-xs" />
                                    
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            variant="default"
                            size="lg"
                            className="h-12 md:h-14"
                        >
                            <SearchIcon size={20} />
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    )
}