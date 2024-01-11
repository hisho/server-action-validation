'use client'

import { ServerErrors, myAction } from '@/app/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { ComponentProps, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = Pick<ComponentProps<'form'>, 'className'>

const schema = z.object({
  name: z
    .string()
    .min(1, { message: 'client error 1文字以上で入力してください' }),
})
type FormInput = z.infer<typeof schema>

export const Form = ({ className }: Props) => {
  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
  })
  const [serverErrors, setServerErrors] = useState<ServerErrors | undefined>(
    undefined
  )

  const action = myAction.bind(null, {
    userId: 'user id',
  })

  const handleSubmit = async (input: FormInput) => {
    setServerErrors(undefined)
    const result = await action(input)

    if (result.success) {
      window.alert(result.message)
    } else {
      setServerErrors(result.errors)
    }
  }

  return (
    <form className={className} onSubmit={form.handleSubmit(handleSubmit)}>
      <input type={'text'} {...form.register('name')} />
      {form.formState.errors.name && (
        <p>{form.formState.errors.name.message}</p>
      )}
      {serverErrors?.name &&
        serverErrors.name.map((message, index) => (
          <p key={`serverErrors_${message}_${index}`}>{message}</p>
        ))}
      <button
        className={
          'mx-auto mt-6 w-full max-w-sm rounded border bg-gray-300 py-2 font-bold transition-colors hover:bg-gray-400'
        }
        type={'submit'}
      >
        Submit
      </button>
    </form>
  )
}
