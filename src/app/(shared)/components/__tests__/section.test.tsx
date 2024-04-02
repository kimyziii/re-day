import '@testing-library/jest-dom'
import { render, renderHook, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe } from 'node:test'
import { CATEGORIES } from '../../util/acvtCategory'
import AtvtSection from '../section'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import React from 'react'

function useCustomHook() {
  return useQuery({
    queryKey: ['categoryItem'],
    queryFn: () => {
      return [
        {
          _id: '66001e98d44dc9956110d48a',
          label: '💻',
          value: '공부',
          userId: 'public',
        },
        {
          _id: '6602463b6e2d7d198cba1c0f',
          label: '💪',
          value: '운동',
          userId: 'public',
        },
      ]
    },
  })
}

const queryClient = new QueryClient()
const wrapper = ({ children }: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: 'admin' },
  }
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' }
    }),
  }
})

describe(async () => {
  it('카테고리를 열고 선택하여 카테고리값을 설정하는 시나리오 테스트', async () => {
    const { result: categories } = renderHook(() => useCustomHook(), {
      wrapper,
    })
    console.log(categories)
    await waitFor(() => categories.current.isSuccess)
    expect(categories.current.data).toBeDefined()

    const user = userEvent.setup()
    window.HTMLElement.prototype.hasPointerCapture = jest.fn()

    const screen = render(<AtvtSection currentDate={new Date()} />, { wrapper })
    await user.click(screen.getByRole('combobox'))

    const comboboxList = screen.getAllByRole('option')
    const categoriesList = Object.entries(CATEGORIES)
    expect(comboboxList.length).toBe(categoriesList.length)

    await user.click(comboboxList[0])
    const clicked = comboboxList[0].dataset.value as string
    expect(screen.getByLabelText(clicked).textContent).toBe(CATEGORIES[clicked])
  })

  it('활동 요약 입력값이 제대로 들어가는지 확인', async () => {
    const user = userEvent.setup()

    const screen = render(<AtvtSection currentDate={new Date()} />, { wrapper })
    const input = screen.getByPlaceholderText(
      '활동내용을 간단히 정리해 작성해 주세요.',
    )
    await user.type(input, '오늘 한 활동을 요약하여 작성')

    expect(input).toHaveValue('오늘 한 활동을 요약하여 작성')
  })

  it('활동 요약 입력값이 제대로 들어가는지 확인', async () => {
    const user = userEvent.setup()

    const screen = render(<AtvtSection currentDate={new Date()} />, { wrapper })
    const input = screen.getByPlaceholderText('내용을 입력해 주세요.')
    await user.type(input, '오늘 이런 걸 했어용.')

    expect(input).toHaveValue('오늘 이런 걸 했어용.')
  })

  it('저장 버튼 누르면 모든 입력값을 다 초기화하기', async () => {
    const { result: categories } = renderHook(() => useCustomHook(), {
      wrapper,
    })
    console.log(categories)
    await waitFor(() => categories.current.isSuccess)
    expect(categories.current.data).toBeDefined()

    const user = userEvent.setup()

    const screen = render(<AtvtSection currentDate={new Date()} />, { wrapper })

    // 카테고리 선택
    await user.click(screen.getByRole('combobox'))
    const comboboxList = screen.getAllByRole('option')
    await user.click(comboboxList[0])

    // 활동 요약 작성
    const inputText = screen.getByPlaceholderText(
      '활동내용을 간단히 정리해 작성해 주세요.',
    )
    await user.type(inputText, '오늘 한 활동을 요약하여 작성')

    // 활동 내용 작성
    const inputTextarea = screen.getByPlaceholderText('내용을 입력해 주세요.')
    await user.type(inputTextarea, '오늘 이런 걸 했어용.')

    // 버튼 클릭
    const submitBtn = screen.getByRole('button')
    await user.click(submitBtn)

    const combobox = screen.getByRole('combobox')
    expect(combobox.textContent).toBe('카테고리')
    expect(inputText).toHaveValue('')
    expect(inputTextarea).toHaveValue('')
  })
})
