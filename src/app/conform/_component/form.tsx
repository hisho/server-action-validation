'use client'

import { conformAction } from '@/app/conform/actions'
import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { ComponentProps, ComponentPropsWithoutRef, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { z } from 'zod'

const Button = (props: ComponentPropsWithoutRef<'button'>) => {
  const { pending } = useFormStatus()

  return <button {...props} disabled={pending || props.disabled} />
}

type Props = Pick<ComponentProps<'form'>, 'className'>

const schema = z.object({
  name: z
    .string()
    .min(2, { message: 'client error 2文字以上で入力してください' }),
})

export const Form = ({ className }: Props) => {
  const [lastResult, action] = useFormState(conformAction, undefined)
  const [form, fields] = useForm({
    defaultValue: {
      name: '',
    },
    lastResult: lastResult?.submission,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema })
    },
    shouldRevalidate: 'onInput',
  })

  useEffect(() => {
    if (lastResult?.submission.status === 'success') {
      form.reset()
      window.alert(lastResult.message)
    }
  }, [lastResult])

  return (
    <form action={action} className={className} {...getFormProps(form)}>
      <input {...getInputProps(fields.name, { type: 'text' })} />
      {fields.name.errors &&
        fields.name.errors.map((message, index) => (
          <p key={`${message}_${index}`}>{message}</p>
        ))}
      <Button
        className={
          'mx-auto mt-6 w-full max-w-sm rounded border bg-gray-300 py-2 font-bold transition-colors hover:bg-gray-400'
        }
        type={'submit'}
      >
        Submit
      </Button>
    </form>
  )
}
