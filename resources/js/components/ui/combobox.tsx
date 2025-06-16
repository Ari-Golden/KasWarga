import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export type ComboboxItem = {
  label: string
  value: string
}

interface ComboboxProps {
  items: ComboboxItem[]
  selectedValue?: string
  onSelect: (value: string) => void
  placeholder?: string
  className?: string
}

export function Combobox({
  items,
  selectedValue,
  onSelect,
  placeholder = "Pilih...",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const selectedItem = items.find((item) => item.value === selectedValue)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
        {selectedItem?.label ?? placeholder}
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command
          filter={(value, search) => {
            // Cari berdasarkan label (nama) dan value (id)
            const item = items.find((item) => item.value === value)
            if (!item) return 0
            const searchLower = search.toLowerCase()
            const labelMatch = item.label.toLowerCase().includes(searchLower)
            const valueMatch = item.value.toLowerCase().includes(searchLower)
            return labelMatch || valueMatch ? 1 : 0
          }}
        >
          <CommandInput placeholder="Search name or id..." className="h-9" />
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
          key={item.value}
          value={item.value}
          onSelect={() => {
            onSelect(item.value)
            setOpen(false)
          }}
              >
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              selectedValue === item.value ? "opacity-100" : "opacity-0"
            )}
          />
          {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          {items.length === 0 && (
            <CommandEmpty>Tidak ada data</CommandEmpty>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
