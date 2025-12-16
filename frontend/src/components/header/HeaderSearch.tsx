"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { setSearchQuery } from "@/store/slices/searchSlice"
import { debounce } from "@/utils/debounce"

interface HeaderSearchProps {
  variant: "mobile" | "desktop"
}

export function HeaderSearch({ variant }: HeaderSearchProps) {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(state => state.search.query)
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  const debouncedSetSearchQueryRef = useRef(
    debounce((query: string) => dispatch(setSearchQuery(query)), 300)
  )

  useEffect(() => {
    setLocalSearchQuery(searchQuery)
  }, [searchQuery])

  const handleSearchChange = (value: string) => {
    setLocalSearchQuery(value)
    debouncedSetSearchQueryRef.current(value)
  }

  const wrapperClassName = variant === "mobile" ? "w-full" : "flex-1 max-w-2xl"
  const inputClassName =
    variant === "mobile"
      ? "w-full px-4 py-2.5 pl-10 pr-4 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent text-sm"
      : "w-full px-4 py-3 pl-12 pr-4 border border-lightgray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent text-sm"
  const iconWrapperClassName =
    variant === "mobile"
      ? "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      : "absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"

  return (
    <div className={wrapperClassName}>
      <div className="relative">
        <input
          type="text"
          value={localSearchQuery}
          onChange={e => handleSearchChange(e.target.value)}
          placeholder="Поиск"
          className={inputClassName}
        />
        <div className={iconWrapperClassName}>
          <Image src="/icons/search.png" alt="Search" width={20} height={20} />
        </div>
      </div>
    </div>
  )
}
