"use client";
const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className=" text-base font-semibold text-emerald-700 ">
          There was a problem
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tighter text-zinc-900">
          {error.message || "Something went wrong"}
        </h1>
        <p className="mt-6 text-base leading-7 text-zinc-600">
          Please try again later or contact support!
        </p>
      </div>
    </main>
    // <div>
    //   error <button onClick={reset}>Try again</button>{" "}
    // </div>
  );
};

export default error;
