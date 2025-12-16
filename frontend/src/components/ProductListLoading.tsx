export function ProductListLoading() {
  return (
    <div className="flex-1 min-w-0">
      <div className="max-w-products mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-[10px]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="w-full h-32 lg:h-48 bg-lightgray bg-opacity-30 animate-pulse" />
              <div className="p-2 lg:p-[20px] space-y-2">
                <div className="h-3 w-20 bg-lightgray bg-opacity-30 rounded animate-pulse" />
                <div className="h-4 w-full bg-lightgray bg-opacity-30 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-lightgray bg-opacity-30 rounded animate-pulse" />
                <div className="flex justify-between">
                  <div className="h-4 w-16 bg-lightgray bg-opacity-30 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-lightgray bg-opacity-30 rounded animate-pulse" />
                </div>
                <div className="h-10 w-full bg-lightgray bg-opacity-30 rounded animate-pulse" />
                <div className="h-8 w-full bg-lightgray bg-opacity-30 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
