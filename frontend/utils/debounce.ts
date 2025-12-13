/**
 * Функция debounce - откладывает выполнение функции до тех пор,
 * пока не пройдет указанное время с момента последнего вызова
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    // Очищаем предыдущий таймер, если он был установлен
    if (timeout) {
      clearTimeout(timeout)
    }

    // Устанавливаем новый таймер
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
