
import { ValueType } from "recharts/types/component/DefaultTooltipContent";

export const safeNumberFormat = (value: ValueType, decimals = 2): string => {
  if (typeof value === 'number') {
    return value.toFixed(decimals);
  }
  if (typeof value === 'string') {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      return num.toFixed(decimals);
    }
    return value;
  }
  return String(value);
};
