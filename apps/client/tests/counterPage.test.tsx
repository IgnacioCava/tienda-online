import { render, screen } from '@testing-library/react'
import Home from '@/app/counter/page'
import userEvent from '@testing-library/user-event'

describe('Página counter', () => {
  beforeEach(() => {
    render(<Home />)
  })
  it('Renderiza el contador', () => {
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })
  it('Altera el contador', async () => {
    const buttonIncrement = screen.getByRole('button', { name: '+' })
    const buttonDecrement = screen.getByRole('button', { name: '-' })
    const buttonReset = screen.getByRole('button', { name: 'Reset' })

    expect(buttonIncrement).toBeInTheDocument()
    expect(buttonDecrement).toBeInTheDocument()
    expect(buttonReset).toBeInTheDocument()

    await userEvent.click(buttonIncrement)
    expect(screen.getByText('Count: 1')).toBeInTheDocument()

    await userEvent.click(buttonReset)
    expect(screen.getByText('Count: 0')).toBeInTheDocument()

    await userEvent.click(buttonDecrement)
    expect(screen.getByText('Count: -1')).toBeInTheDocument()
  })
})
