import { IProduct } from '@shared/*'
import { HTMLInputTypeAttribute } from 'react'

const FormInput = ({
  form,
  setForm,
  verifyForm,
  verifyError,
  label,
  placeholder,
  name,
  type,
}: {
  form: Partial<IProduct>
  setForm: (form: Partial<IProduct>) => void
  verifyForm: (form: Partial<IProduct>) => void
  verifyError: Record<string, string>
  label: string
  placeholder: string
  name: string
  type: HTMLInputTypeAttribute
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        <input
          type={type}
          className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          value={form[name as keyof typeof form] || ''}
          name={name}
          onChange={(e) => {
            verifyForm({
              ...form,
              [name]: type === 'number' ? +e.target.value : e.target.value,
            })
            setForm({
              ...form,
              [name]: type === 'number' ? +e.target.value : e.target.value,
            })
          }}
        />
      </label>

      {verifyError[name] ? <span className="warning">{verifyError[name]}</span> : null}
    </div>
  )
}

export default FormInput
