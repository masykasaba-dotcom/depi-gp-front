import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-base-content/60">
        404
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-base-content/70">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-[#272727] py-4 px-10 mt-5 rounded-lg text-white"
      >
        Back to home
      </Link>
    </section>
  );
}
