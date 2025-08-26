import type { Updater } from '@tanstack/vue-table'
import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Ref } from 'vue'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}

export function valueUpdater<T>(updaterOrValue: Updater<T>, ref: Ref<T>): void {
  if (typeof updaterOrValue === 'function') {
    const fn = updaterOrValue as (old: T) => T
    ref.value = fn(ref.value)
  } else {
    ref.value = updaterOrValue
  }
}
