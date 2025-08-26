<template>
  <div class="flex w-full flex-col">
    <Tabs default-value="buy">
      <TabsList>
        <TabsTrigger value="buy">
          구매하기
        </TabsTrigger>
        <TabsTrigger value="sell">
          판매하기
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="buy"
        class="w-full flex flex-col mt-3"
      >
        <div class="relative w-full items-center">
          <Input
            id="search"
            v-model="search"
            type="text"
            placeholder="상품을 검색해보세요"
            class="pl-[50px] py-5 rounded-full"
          />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-4">
            <Search class="size-5 text-muted-foreground" />
          </span>
        </div>
        <div class="flex overflow-scroll gap-3 mt-4">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="flex flex-col justify-center items-center gap-2"
          >
            <div class="rounded-full h-14 w-14 bg-slate-200" />
            <TypographyP2 class="w-[70px] text-center text-gray-500 font-semibold">
              {{
                category
              }}
            </TypographyP2>
          </div>
        </div>
        <Separator class="my-4" />
        <div class="flex gap-2">
          <Select v-model="filter1">
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

          <Select v-model="filter2">
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
        </div>
        <div class="flex flex-col gap-4 mt-3">
          <Card>
            <div class="bg-slate-300 w-full h-[150px] rounded-t-md" />

            <CardContent class="pt-3">
              <TypographyHead3>35% 달성 중이에요</TypographyHead3>
              <TypographySubTitle1>맛있는 찰옥수수 냉동 옥수수 10개, 옥수수중</TypographySubTitle1>
              <TypographyP1 class="text-gray-400">
                주식회사 착착
              </TypographyP1>
            </CardContent>
            <CardFooter class="flex gap-2">
              <Badge variant="secondary">
                25일 남음
              </Badge>
              <Badge variant="secondary">
                쿠폰
              </Badge>
            </CardFooter>
          </Card>
          <Card>
            <div class="bg-slate-300 w-full h-[150px] rounded-t-md" />

            <CardContent class="pt-3">
              <TypographyHead3>35% 달성 중이에요</TypographyHead3>

              <TypographySubTitle1>맛있는 찰옥수수 냉동 옥수수 10개, 옥수수중</TypographySubTitle1>
              <TypographyP1 class="text-gray-400">
                주식회사 착착
              </TypographyP1>
            </CardContent>
            <CardFooter class="flex gap-2">
              <Badge class="bg-red-100 text-red-600">
                마감임박
              </Badge>
              <Badge variant="secondary">
                배송
              </Badge>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="sell">
        판매자 페이지 렌더링
      </TabsContent>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardFooter } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { Separator } from '@/shared/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import {
  TypographyHead3,
  TypographyP1,
  TypographyP2,
  TypographySubTitle1,
} from '@/shared/components/ui/typography'
import { FunnelX, Search } from 'lucide-vue-next'
import { ref } from 'vue'

const search = ref<string>('')
const filter1 = ref<string | undefined>(undefined) // 모집 상태
const filter2 = ref<string | undefined>(undefined) // 거래 방식

const categories = [
  '패션',
  '뷰티 / 헬스',
  '디지털/가전',
  '생활 / 주방',
  '식품',
  '취미 / 문구',
  '스포츠',
  '유아',
]

function removeFilter() {
  filter1.value = undefined
  filter2.value = undefined
}
</script>
