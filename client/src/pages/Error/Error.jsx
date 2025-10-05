import { NavLink, useRouteError } from "react-router-dom";

export const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <section className="w-full min-h-screen flex flex-col justify-center items-center text-center bg-gray-50 text-red-900">
        <div id="error-text">
          <figure>
            <img
              src="/404-page.gif"
              alt="404 page"
              className="w-[350px] mx-auto mb-6"
            />
          </figure>
          <div className="text-center">
            <p className="mb-4 text-lg">
              The page you were looking for could not be found.
            </p>
            <p className="mb-6 text-base text-gray-700">
              ... Back to previous page
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <NavLink
            to="/"
            className="text-white bg-red-700 px-5 py-2 rounded-lg font-medium hover:bg-red-800 transition-all duration-300"
          >
            Go back to Home
          </NavLink>
          
        </div>
      </section>
    );
  }

  return (
    <h1 className="text-center text-2xl text-red-900 mt-20">
      The page you are looking for does not exist.
    </h1>
  );
};
