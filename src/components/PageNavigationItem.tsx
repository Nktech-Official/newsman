import { useNavigate } from "react-router-dom";
import { ApiNewsCountry } from "../lib/types";

export default function PageNavigationItem({
  pageNumber,
  country,
}: {
  pageNumber: number;
  country: ApiNewsCountry;
}) {
  const navigate = useNavigate();
  const goToPage = () => {
    navigate(`/?page=${pageNumber}&country=${country}`);
  };
  return (
    <li>
      <span
        onClick={goToPage}
        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
      >
        {pageNumber}
      </span>
    </li>
  );
}
