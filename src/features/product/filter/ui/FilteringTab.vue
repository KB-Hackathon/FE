<template>
  <Select v-model="mFilter1">
    <SelectTrigger class="h-[45px]">
      <SelectValue placeholder="모집 상태" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="전체">
          전체
        </SelectItem>
        <SelectItem value="모집 중">
          모집 중
        </SelectItem>
        <SelectItem value="모집 예정">
          모집 예정
        </SelectItem>
        <SelectItem value="모집 완료">
          모집 완료
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>

  <Select v-model="mFilter2">
    <SelectTrigger class="h-[45px]">
      <SelectValue placeholder="거래 방식" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="전체">
          전체
        </SelectItem>
        <SelectItem value="쿠폰">
          쿠폰
        </SelectItem>
        <SelectItem value="택배">
          택배
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>

  <Button
    class="h-[45px]"
    variant="outline"
    @click="removeFilter"
  >
    <FunnelX />
  </Button>
</template>
<script setup lang="ts">
import { Button } from '@/shared/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { FunnelX } from 'lucide-vue-next'

const mFilter1 = defineModel<string | undefined>('filter1')
const mFilter2 = defineModel<string | undefined>('filter2')

function removeFilter() {
  mFilter1.value = undefined
  mFilter2.value = undefined
}
</script>
