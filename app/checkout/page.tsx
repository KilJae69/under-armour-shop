import Image from "next/image";

export default function Checkout() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
        <div className="flex flex-col items-center">
          <Image
            src="/shopping-cart.avif" // Replace with an appropriate image
            alt="Checkout"
            width={150}
            height={150}
            className="mb-4"
          />
          <h1 className="mb-2 text-3xl font-semibold">Checkout Page</h1>
          <p className="mb-6 text-center text-gray-600">
            This feature is currently not implemented because upgrading to a Wix
            paid plan is required for enabling e-commerce functionalities. As
            this is a pet project for my portfolio, I have chosen not to upgrade
            at this time.
          </p>
         
        </div>
      </div>
    </section>
  );
}
