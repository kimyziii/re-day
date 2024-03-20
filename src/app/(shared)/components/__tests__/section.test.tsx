import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe } from 'node:test'
import { CATEGORIES } from '../../util/acvtCategory'
import AtvtSection from '../section'

describe(() => {
  it('카테고리를 열고 선택하여 카테고리값을 설정하는 시나리오 테스트', async () => {
    const user = userEvent.setup()
    window.HTMLElement.prototype.hasPointerCapture = jest.fn()

    const screen = render(<AtvtSection />)
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

    const screen = render(<AtvtSection />)
    const input = screen.getByPlaceholderText(
      '활동내용을 간단히 정리해 작성해 주세요.',
    )
    await user.type(input, '오늘 한 활동을 요약하여 작성')

    expect(input).toHaveValue('오늘 한 활동을 요약하여 작성')
  })

  it('활동 요약 입력값이 제대로 들어가는지 확인', async () => {
    const user = userEvent.setup()

    const screen = render(<AtvtSection />)
    const input = screen.getByPlaceholderText('내용을 입력해 주세요.')
    await user.type(input, '오늘 이런 걸 했어용.')

    expect(input).toHaveValue('오늘 이런 걸 했어용.')
  })

  it('저장 버튼 누르면 모든 입력값을 다 초기화하기', async () => {
    const user = userEvent.setup()

    const screen = render(<AtvtSection />)

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
