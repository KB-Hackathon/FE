<template>
  <div class="w-full flex flex-col gap-3">
    <Button class="w-[300px]">
      hello world
    </Button>
    <Input placeholder="Email" />
    <DropdownComponent />
    <CardComponent />
    <PaginationComponent />
    <TabComponent />
    <AlertComponent />
    <AccordionComponent />
    <AlertDialogComponent />
    <AvatarComponent />
    <BadgeComponent />
    <CheckboxComponent />
    <CalendarComponent />
    <ToastComponent />
    <SelectComponent />
    <TagInputComponent />
  </div>
</template>
<script setup lang="ts">
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'

import AccordionComponent from '@/features/test/AccordionComponent.vue'
import AlertComponent from '@/features/test/AlertComponent.vue'
import AlertDialogComponent from '@/features/test/AlertDialogComponent.vue'
import AvatarComponent from '@/features/test/AvatarComponent.vue'
import BadgeComponent from '@/features/test/BadgeComponent.vue'
import CalendarComponent from '@/features/test/CalendarComponent.vue'
import CardComponent from '@/features/test/CardComponent.vue'
import CheckboxComponent from '@/features/test/CheckboxComponent.vue'
import DropdownComponent from '@/features/test/DropdownComponent.vue'
import PaginationComponent from '@/features/test/PaginationComponent.vue'
import SelectComponent from '@/features/test/SelectComponent.vue'
import TabComponent from '@/features/test/TabComponent.vue'
import TagInputComponent from '@/features/test/TagInputComponent.vue'
import ToastComponent from '@/features/test/ToastComponent.vue'
</script>
