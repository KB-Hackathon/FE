<template>
  <div class="relative w-full h-[800px] overflow-hidden rounded-md">
    <video
      ref="videoRef"
      autoplay
      muted
      playsinline
      webkit-playsinline
      class="absolute inset-0 w-full h-full object-cover"
    />
  </div>
  <Button
    class="w-full h-[60px] bg-ccmkt-main"
    @click="onClickCancelButton"
  >
    <TypographyHead2 class="text-black">
      취소
    </TypographyHead2>
  </Button>
</template>

<script setup lang="ts">
import { Button } from '@/shared/components/ui/button'
import { TypographyHead2 } from '@/shared/components/ui/typography'
import { BrowserQRCodeReader, type IScannerControls } from '@zxing/browser'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const videoRef = ref<HTMLVideoElement | null>(null)
const qrResult = ref('')
let codeReader: BrowserQRCodeReader
let controls: IScannerControls | null = null

const startScan = async () => {
  qrResult.value = ''
  codeReader = new BrowserQRCodeReader()

  try {
    controls = await codeReader.decodeFromVideoDevice(undefined, videoRef.value!, (result) => {
      if (result) {
        qrResult.value = result.getText()
        stopScan()
        console.log(result)
        router.push({ name: 'qr_info', query: { result: result.getText() } })
      }
    })
  } catch (error) {
    console.error('QR 인식 에러:', error)
  }
}

const stopScan = () => {
  if (controls) {
    controls.stop()
    controls = null
  }
}

function onClickCancelButton() {
  router.push({ name: 'owner_main' })
}

onMounted(() => {
  startScan()
})

onBeforeUnmount(() => {
  stopScan()
})
</script>
