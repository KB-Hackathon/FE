import ErrorBoundary from '@/shared/components/ui/ErrorBoundary.vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

const Boom = {
  template: `<div/>`,
  created() {
    throw new Error('boom!')
  },
}

describe('ErrorBoundary', () => {
  it('에러 발생 시 fallback 슬롯을 노출한다', async () => {
    const wrapper = mount(ErrorBoundary, {
      slots: {
        default: Boom,
        fallback: '<div class="fb">문제가 발생했습니다</div>',
      },
    })
    await Promise.resolve()
    expect(wrapper.find('.fb').exists()).toBe(true)
  })

  it('에러가 없으면 기본 슬롯을 렌더링한다', async () => {
    const wrapper = mount(ErrorBoundary, {
      slots: { default: '<div class="ok">OK</div>' },
    })
    expect(wrapper.find('.ok').exists()).toBe(true)
  })
})
