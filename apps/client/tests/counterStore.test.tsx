import { useCounterStore } from '@/store/useCounterStore'

beforeEach(() => {
  useCounterStore.setState({ count: 0 })
})

describe('useCounterStore', () => {
  test('Incrementa el contador', () => {
    useCounterStore.getState().increment()
    expect(useCounterStore.getState().count).toBe(1)
  })

  test('Disminuye el contador', () => {
    useCounterStore.getState().decrement()
    expect(useCounterStore.getState().count).toBe(-1)
  })
})
