/**
 * Форматирует цену до 2 знаков после запятой в формате ru-RU
 * @param price - цена (строка, как приходит из API)
 * @returns отформатированная строка цены
 */
export function formatPrice(price: string): string {
  const numPrice = parseFloat(price)
  return numPrice.toLocaleString("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
