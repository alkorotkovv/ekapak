# Екапак Frontend

Frontend приложение на Next.js с Redux и React Query.

## Установка

```bash
cd frontend
npm install
```

## Запуск в режиме разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Структура проекта

- `app/` - страницы и роутинг Next.js (App Router)
- `components/` - React компоненты
- `hooks/` - кастомные хуки (включая React Query hooks)
- `pages/` - страницы приложения
- `store/` - Redux store и slices
- `types/` - TypeScript типы
- `utils/` - утилиты и вспомогательные функции

## Технологии и решения

### Основной стек

- **Next.js 14** (App Router) - SSR, роутинг
- **React 18** - UI библиотека
- **TypeScript** - строгая типизация для всех данных из API
- **Redux Toolkit** - управление состоянием (корзина, поиск)
- **React Query (TanStack Query)** - кеширование и синхронизация данных с API
- **Tailwind CSS** - CSS фреймворк
- **Ant Design** - UI компоненты (Pagination, Breadcrumb, Carousel)

### Архитектурные решения

- **SSR с prefetch** - предзагрузка данных на сервере для улучшения SEO и производительности
- **Строгая типизация API** - все ответы от API типизированы через TypeScript интерфейсы
- **Клиентская фильтрация** - поиск и фильтрация товаров выполняются на клиенте для быстрого отклика
- **Клиентская пагинация** - постраничный переход для улучшения производительности
- **Debounce для поиска** - оптимизация запросов при вводе текста (300ms задержка)
- **Единая разметка для всех устройств** - адаптивность через Tailwind классы
- **Централизованные утилиты** - форматирование цен, debounce, API функции в отдельных модулях
- **Кастомные хуки** - инкапсуляция логики (useProductQuantity, useProducts, useCategories)

## Изображения интерфейса

![Скриншот 1](./frontend/public/images/1.png)
![Скриншот 2](./frontend/public/images/2.png)
![Скриншот 3](./frontend/public/images/3.png)
![Скриншот 4](./frontend/public/images/4.png)
