import Link from 'next/link'

const LandingPage = () => {
  return (
    <main className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 w-full">
      {/* Blurred SVG background blob */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-300 opacity-30 blur-3xl animate-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-300 opacity-30 blur-3xl animate-pulse"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="z-10 text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 drop-shadow-md">
          Bienvenido a Tienda Online
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-700">
          La mejor forma de buscar lo que queres.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition rounded-xl text-lg font-semibold shadow-lg"
        >
          Empezar
        </Link>
      </div>
    </main>
  )
}

export default LandingPage
