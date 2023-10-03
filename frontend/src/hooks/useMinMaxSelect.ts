import { useState } from 'react';

// Custom hook to handle dynamic updating of minimum and maximum selectors
function useMinMaxSelect(initialMinValue: string | number, initialMaxValue: string | number, options: number[]) {
  const [minValue, setMinValue] = useState(initialMinValue);
  const [maxValue, setMaxValue] = useState(initialMaxValue);

  const handleMinChange = (value: string | number) => {
    setMinValue(value);
    if (value !== '' && parseInt(value as string, 10) > parseInt(maxValue as string, 10)) {
      // Ensure minimum value is not greater than maximum value
      setMaxValue(value);
    }
  };

  const handleMaxChange = (value: string | number) => {
    setMaxValue(value);
    if (value !== '' && parseInt(value as string, 10) < parseInt(minValue as string, 10)) {
      // Ensure maximum value is not smaller than minimum value
      setMinValue(value);
    }
  };

  return {
    minValue,
    maxValue,
    handleMinChange,
    handleMaxChange,
    options,
  };
}

export default useMinMaxSelect;
