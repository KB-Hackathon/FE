<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <CardTitle>Login to your account</CardTitle>
      <CardDescription> Enter your email below to login to your account </CardDescription>
    </CardHeader>
    <CardContent>
      <form>
        <div class="flex flex-col gap-6">
          <div class="grid gap-2">
            <Label html-for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label html-for="password">Password</Label>
              <a
                href="#"
                class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              required
            />
          </div>
        </div>
      </form>
    </CardContent>
    <CardFooter class="flex-col gap-2">
      <Button class="w-[300px]">
        Login
      </Button>
      <Button
        variant="outline"
        class="w-[300px]"
      >
        Login with Google
      </Button>
    </CardFooter>
  </Card>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>
