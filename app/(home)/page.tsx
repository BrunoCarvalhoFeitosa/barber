import { Header } from "@/app/_components/common/header"
import { Search } from "@/app/_components/homePage/search"
import { BookingItem } from "@/app/_components/common/booking-item"
import { Barbershop } from "@/app/_components/homePage/barbershop";

const HomePage = async () => {
    return (
        <div>
            <Header />
            <main className="pb-14">
                <Search />
                <BookingItem title="Agendamentos" />
                <Barbershop title="Recomendados" />
                <Barbershop title="Populares" />
            </main>
        </div>
    );
}

export default HomePage