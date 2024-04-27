import Link from "next/link"
import { Button } from "@/app/_components/ui/button"
import { Header } from "./_components/common/header"

const NotFoundPage = () => {
    return (
        <main>
            <Header />
            <section className="flex flex-col justify-center items-center w-full h-[100dvh]">
                <div className="text-center">
                    <h1 className="text-7xl font-bold">
                        404
                    </h1>
                    <p>
                        A barbearia não encontrada.
                    </p>
                </div>
                <div className="mt-2">
                    <Link href="/">
                        <Button size="lg">
                            Voltar para a home
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    )
}
 
export default NotFoundPage