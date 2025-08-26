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
import AccordionComponent from './Test/AccordionComponent.vue'
import AlertComponent from './Test/AlertComponent.vue'
import AlertDialogComponent from './Test/AlertDialogComponent.vue'
import AvatarComponent from './Test/AvatarComponent.vue'
import BadgeComponent from './Test/BadgeComponent.vue'
import CalendarComponent from './Test/CalendarComponent.vue'
import CardComponent from './Test/CardComponent.vue'
import CheckboxComponent from './Test/CheckboxComponent.vue'
import DropdownComponent from './Test/DropdownComponent.vue'
import PaginationComponent from './Test/PaginationComponent.vue'
import SelectComponent from './Test/SelectComponent.vue'
import TabComponent from './Test/TabComponent.vue'
import TagInputComponent from './Test/TagInputComponent.vue'
import ToastComponent from './Test/ToastComponent.vue'
</script>
