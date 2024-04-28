const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function seedDatabase() {
  try {
    const images = [
      "https://utfs.io/f/20945d2a-8d38-4100-bb2e-ee9712aa9c25-vmbc7w.jpg",
      "https://utfs.io/f/cc788b2b-7323-43ca-9ed4-5eefdde5fa34-vmbc7x.jpg",
      "https://utfs.io/f/39a0dff6-a8cc-4e9c-86ed-da8e4c61b1f6-vmbc7y.jpg",
      "https://utfs.io/f/7a777ed6-4ebc-4ba5-9a07-93d20457f734-vmbc7z.jpg",
      "https://utfs.io/f/07769e87-6281-4b08-ac4b-663f60fc79ff-vmbc80.jpg",
      "https://utfs.io/f/4d3a2ee9-d9a0-43c5-b683-3b13ac84438f-vmbc81.jpg",
      "https://utfs.io/f/1ea74c59-382a-4ff0-9c56-ad6bde778e31-vmbc82.jpg",
      "https://utfs.io/f/2cd2fc33-ebe3-4d23-8cbc-68bc321dc9ee-vmbc83.jpg",
      "https://utfs.io/f/131b3e73-347d-425b-8271-872982630893-vmbc84.jpg",
      "https://utfs.io/f/d80312e3-8912-4baa-a27c-ddac4efadc55-vmbc8q.jpg"
    ]

    const creativeNames = [
      "Barbearia Vintage",
      "Corte & Estilo",
      "Barba & Navalha",
      "The Dapper Den",
      "Cabelo & Cia.",
      "Machado & Tesoura",
      "Barbearia Elegance",
      "Aparência Impecável",
      "Estilo Urbano",
      "Estilo Clássico",
    ]

    const addresses = [
      "Rua da Barbearia, 123",
      "Avenida dos Cortes, 456",
      "Praça da Barba, 789",
      "Travessa da Navalha, 101",
      "Alameda dos Estilos, 202",
      "Estrada do Machado, 303",
      "Avenida Elegante, 404",
      "Praça da Aparência, 505",
      "Rua Urbana, 606",
      "Avenida Clássica, 707",
    ]

    const services = [
      {
        name: "Corte de Cabelo",
        description: "Estilo personalizado com as últimas tendências.",
        price: "60.0",
        imageUrl: "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        name: "Barba",
        description: "Modelagem completa para destacar sua masculinidade.",
        price: "40.0",
        imageUrl: "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
      },
      {
        name: "Pézinho",
        description: "Acabamento perfeito para um visual renovado.",
        price: "35.0",
        imageUrl: "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
      {
        name: "Sobrancelha",
        description: "Expressão acentuada com modelagem precisa.",
        price: "20.0",
        imageUrl: "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
      },
      {
        name: "Massagem",
        description: "Relaxe com uma massagem revigorante.",
        price: "50.0",
        imageUrl: "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
      },
      {
        name: "Hidratação",
        description: "Hidratação profunda para cabelo e barba.",
        price: "25.0",
        imageUrl: "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
    ]

    const barbershops = []

    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i]
      const address = addresses[i]
      const imageUrl = images[i]

      const barbershop = await prisma.barbershop.create({
        data: {
          name,
          address,
          imageUrl: imageUrl,
        },
      })

      for (const service of services) {
        await prisma.service.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            barbershop: {
              connect: {
                id: barbershop.id,
              },
            },
            imageUrl: service.imageUrl,
          },
        })
      }

      barbershops.push(barbershop)
    }

    await prisma.$disconnect()
  } catch (error) {
    console.error("Error while create barber", error)
  }
}

seedDatabase()