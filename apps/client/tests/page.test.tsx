import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Página principal', () => {
  it('Renderiza el logo de Next', () => {
    render(<Home />)
    expect(screen.getByAltText('Next.js logo')).toBeInTheDocument()
  })
})
