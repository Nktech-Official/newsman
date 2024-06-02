import axios from "axios";
import { ChangeEventHandler, useEffect, useState } from "react";
import { ApiNewsCountry, Headlines } from "./lib/types";
import HeadlineCard from "./components/HeadlineCard";
import PageNavigationItem from "./components/PageNavigationItem";
import { useNavigate } from "react-router-dom";
import { countries } from "./lib/countries";

export default function App() {
  const [headlines, setHeadlines] = useState<Headlines[]>();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [outOfRange, setOutOfRange] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [countryCode, setCountrCode] = useState<ApiNewsCountry>("in");
  // Reading queryParameters To maintain state
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const page = urlParams.get("page") || "1";
  const navigate = useNavigate();

  useEffect(() => {
    setError(false);
    setOutOfRange(false);
    axios
      .get(`/api/headlines?pageNo=${page}&country=${countryCode}`)
      .then((res) => {
        setHeadlines(res.data.articles);
        setTotalPages(res.data.totalPage);
      })
      .catch((err) => {
        const errorData = err.response.data;
        if (errorData.error === "OutOfBound") setOutOfRange(true);
        else setError(true);
      });
  }, [page, totalPages, error, countryCode]);
  const pagesToRender = Array.from({ length: totalPages as number });
  const nextHeadlines = () => {
    const p = parseInt(page) + 1;
    if (p <= totalPages) {
      navigate(`/?page=${p}`);
    }
  };
  const previousHeadlines = () => {
    const p = parseInt(page as string) - 1;

    if (p > 0) {
      navigate(`/?page=${p}`);
    }
  };
  const countryChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setCountrCode(event.target.value as ApiNewsCountry);
  };
  return (
    <div className="container m-auto">
      {/* <div className="max-w-screen-xl mx-auto px-4 md:px-8"> */}
      <div className="items-center justify-between mb-4 py-4 border-b md:flex">
        <div>
          <h3 className="text-gray-800 text-3xl font-bold">Headlines</h3>
        </div>
        <div className="items-center gap-x-3 mt-6 md:mt-0 sm:flex">
          <form className="max-w-sm mx-auto">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              onChange={countryChange}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {countries.map((country) => {
                return <option value={country.code}>{country.name}</option>;
              })}
            </select>
          </form>
        </div>
      </div>
      {/* </div> */}
      <div className="">
        {headlines &&
          headlines.map((headline, index) => {
            return <HeadlineCard key={index} {...headline} />;
          })}
        {outOfRange && (
          <>
            <div className="h-[80vh] flex justify-center items-center text-lg m-4 lg:text-2xl font-semibold text-center">
              Page is Out of Range Please use Navigation Bar below to go to
              correct page
            </div>
          </>
        )}
        {error && (
          <>
            <div className="h-[80vh] flex justify-center items-center text-lg m-4 lg:text-2xl font-semibold text-center">
              Internal Server Error: 500
            </div>
          </>
        )}
        <nav
          aria-label="Page navigation"
          className="flex cursor-pointer justify-center mt-4 mb-9"
        >
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li className="disabled" onClick={previousHeadlines}>
              <p className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100">
                <span className="sr-only">Previous</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </p>
            </li>

            {pagesToRender.map((_, index) => {
              return <PageNavigationItem pageNumber={index + 1} key={index} />;
            })}

            <li>
              <p
                onClick={nextHeadlines}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-2.5 h-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
