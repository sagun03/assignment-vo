import { Checkbox } from "../ui/checkbox";
import { CheckboxProps } from "./types";

const CheckboxComponent: React.FC<CheckboxProps> = ({ id, checked, onCheckedChange }) => (
  <Checkbox id={id} checked={checked} onCheckedChange={(checked) => onCheckedChange(checked === true)} />
);

export default CheckboxComponent;
