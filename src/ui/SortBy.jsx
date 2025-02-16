import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);

    setSearchParams(searchParams);
  }

  return (
    <Select
      value={sortBy}
      options={options}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;

// Select Component >>>(
//     <StyledSelect value={value} {...props} onChange={onChange}>
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </StyledSelect>
