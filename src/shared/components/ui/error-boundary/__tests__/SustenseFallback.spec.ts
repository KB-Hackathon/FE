import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { Component, defineAsyncComponent, defineComponent, h } from 'vue'

const AsyncOk = defineAsyncComponent({
  loader: () =>
    new Promise<Component>((resolve) => {
      setTimeout(() => {
        resolve(
          defineComponent({
            name: 'AsyncOk',
            render() {
              return h('div', { class: 'ok' }, 'OK')
            },
          })
        )
      }, 10)
    }),
})
const Host = {
  components: { AsyncOk },
  template: `
    <Suspense>
      <template #default><AsyncOk /></template>
      <template #fallback><div class="fb">로딩중...</div></template>
    </Suspense>
  `,
}

describe('Suspense', () => {
  it('로딩 동안 fallback을 보여준다', async () => {
    const wrapper = mount(Host)
    expect(wrapper.find('.fb').exists()).toBe(true)
    await new Promise((r) => setTimeout(r, 15))
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.ok').exists()).toBe(true)
  })
})
