import { Dispatch, SetStateAction } from "react"
import { TData } from "../Cards/types"

export type THeaderProps = {
  originalData:TData[]
  setFilteredData: Dispatch<SetStateAction<TData[]>>
}