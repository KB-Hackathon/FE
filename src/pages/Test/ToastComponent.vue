<template>
  <Button
    variant="outline"
    @click="
      () => {
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
        })
      }
    "
  >
    Add to calendar
  </Button>
</template>
<script setup lang="ts">
import { Button } from '@/shared/components/ui/button'
import { toast } from 'vue-sonner'
</script>
