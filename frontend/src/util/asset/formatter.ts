/**
 * 숫자를 원화 표기 형식으로 변환
 * 예: 1000000 → "1,000,000원"
 */
export const formatCurrency = (value: number): string => {
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * 숫자를 퍼센트(%) 형식으로 변환
 * 예: 3.456 → "3.46%"
 * 소수점 자릿수는 기본 2자리
 */
export const formatPercent = (value: number, digits = 2): string => {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${Math.abs(value).toFixed(digits)}%`;
};

/**
 * 손익에 따라 앞에 +, - 부호 붙이기
 * 예: 5000 → "+5,000원", -3000 → "-3,000원"
 */
export const formatSignedCurrency = (value: number): string => {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}$${Math.abs(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * 0보다 작으면 '하락', 0보다 크면 '상승', 0이면 '보합'
 */
export const formatTrend = (value: number): "상승" | "하락" | "보합" => {
  if (value > 0) return "상승";
  if (value < 0) return "하락";
  return "보합";
};
