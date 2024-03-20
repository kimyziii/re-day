import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CATEGORIES } from '../../util/acvtCategory'
import AtvtSection from '../section'

it('카테고리를 열고 선택하여 카테고리값을 설정하는 테스트', async () => {
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
