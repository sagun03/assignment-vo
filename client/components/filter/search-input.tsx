import { Input } from "../ui/input";
import { InputProps } from "./types";

const SearchInput: React.FC<InputProps> = ({
  id,
  value,
  placeholder,
  onChange,
  className,
}) => (
  <Input
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={className}
  />
);

export default SearchInput;
