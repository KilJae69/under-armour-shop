import Link from "next/link";

export default function NotFound() {
  return (
    <div className=" mt-64 min-h-screen px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="mx-auto  flex max-w-lg flex-col items-center">
        <p className="text-base font-semibold leading-8 text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="text-sm font-semibold leading-7 text-primary"
          >
            <span aria-hidden="true">&larr;</span> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
