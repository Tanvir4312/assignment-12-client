

import { Link, useRouteError } from "react-router-dom";


const Error = () => {
  const error = useRouteError();

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-700 mt-2">
        {error?.message || "Something went wrong!"}
      </p>
      <p className="text-sm text-gray-500 mt-1">
        {error?.status && `Status code: ${error.status}`}
      </p>
      <p>Please go to <span className="text-green-500 font-bold"><Link to={'/'}>Home</Link></span></p>
    </div>
  );
};

export default Error;