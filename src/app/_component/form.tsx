'use client'

import { myAction } from '@/app/actions'
import { ComponentProps, FormEvent } from 'react'

type Props = Pick<ComponentProps<'form'>, 'className'>

export const Form = ({ className }: Props) => {
  const action = myAction.bind(null, {
    hoge: 'fuga',
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const hoge = await action(new FormData(event.currentTarget))
    console.log(hoge, 'client')
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <input name={'name'} type={'text'} />
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
