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

  // dynammically render page navigation
  const pagesToRender = Array.from({ length: totalPages });

  // Reading queryParameters To maintain state
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const page = urlParams.get("page") || "1";
  const countryCode = (urlParams.get("country") || "in") as ApiNewsCountry;
  const navigate = useNavigate();

  useEffect(() => {
    setError(false); //set Error to false
    setOutOfRange(false); //set outOfRange error to false
    axios
      .get(`/api/headlines?pageNo=${page}&country=${countryCode}`) //call backend for data
      .then((res) => {
        setHeadlines(res.data.articles);
        setTotalPages(res.data.totalPage);
      })
      .catch((err) => {
        const errorData = err.response.data;
        if (errorData.error === "OutOfBound")
          setOutOfRange(true); //If outOf Bound set Error for it
        else setError(true); //Set Error
      });
  }, [page, totalPages, error, countryCode]);

  const nextHeadlines = () => {
    const nextPage = parseInt(page) + 1; //next page to navigate to
    if (nextPage <= totalPages) {
      //check for bounds.
      navigate(`/?page=${nextPage}&country=${countryCode}`);
    }
  };
  const previousHeadlines = () => {
    const previousPage = parseInt(page as string) - 1; //Previous Page to navigate to.

    if (previousPage > 0) {
      //check for bounds
      navigate(`/?page=${previousPage}&country=${countryCode}`);
    }
  };
  const countryChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    //navigate on country change
    navigate(`/?country=${event.target.value}`);
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
              value={countryCode} //link state and value (double link)
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
              return (
                <PageNavigationItem
                  pageNumber={index + 1}
                  country={countryCode}
                  key={index}
                />
              );
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
