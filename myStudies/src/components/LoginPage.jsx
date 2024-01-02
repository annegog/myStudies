import React from "react";
import img11 from "../assets/akadimia_big.png";

const LoginPage = () => {
  return (
    <div className="min-h-[70vh]">
      <div className="flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-10">
        <div className="md:w-2/4 text-left ml-4">
          <h2 className="text-5xl font-semibold leading-tight">Καλως ήρθατε</h2>
          <p className="text-lightText mt-2 text-start">
            στη διαδικτυακή περιοχή των γραμματειών του Εθνικού και
            Καποδιστριακού Πανεπιστιμίου Αθηνών!
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-10">
        <div className="w-full md:w-2/3 lg:w-3/5 xl:w-2/3">
          <img src={img11} alt="img" className="rounded-lg overflow-hidden" />
        </div>

        <div className="w-full md:w-2/3 lg:w-2/5 xl:w-1/3 md:ml-4">
          <form className="bg-gray-100 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Σύνδεση Χρήστη
            </h2>
            <div className="mb-4">
              <label htmlFor="email" className="text-sm block font-medium">
                Χρήστης:
              </label>
              <input
                // type="email"
                // id="email"
                // name="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-sm block font-medium">
                Κωδικός:
              </label>
              <input
                // type="password"
                // id="password"
                // name="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md p-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white rounded-md p-2 hover:bg-blue-700"
            >
              Σύνδεση
            </button>
            <a href="/help" className="block text-center text-blue-600 mt-2">
              Ξέχασες τον κωδικό σου?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
