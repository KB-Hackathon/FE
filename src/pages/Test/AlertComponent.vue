<template>
  <div class="grid w-full max-w-xl items-start gap-4">
    <Alert>
      <CheckCircle2Icon class="w-5 -mt-2" />
      <AlertTitle>Success! Your changes have been saved</AlertTitle>
      <AlertDescription> This is an alert with icon, title and description. </AlertDescription>
    </Alert>
    <Alert>
      <PopcornIcon class="w-5 -mt-2" />
      <AlertTitle> This Alert has a title and an icon. No description. </AlertTitle>
    </Alert>
    <Alert variant="destructive">
      <AlertCircleIcon class="w-5 -mt-2" />
      <AlertTitle>Unable to process your payment.</AlertTitle>
      <AlertDescription>
        <p>Please verify your billing information and try again.</p>
        <ul class="list-inside list-disc text-sm">
          <li>Check your card details</li>
          <li>Ensure sufficient funds</li>
          <li>Verify billing address</li>
        </ul>
      </AlertDescription>
    </Alert>
  </div>
</template>
<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/shared/components/ui/alert'
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from 'lucide-vue-next'
</script>
