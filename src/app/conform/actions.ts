'use server'

import { parseWithZod } from '@conform-to/zod'
import { z } from 'zod'

const schema = z.object({
  name: z
    .string()
    .max(10, { message: 'server error 10文字以内で入力してください' }),
})

export const conformAction = async (_: unknown, formData: FormData) => {
  const submission = await parseWithZod(formData, {
    async: true,
    schema: schema,
  })

  if (submission.status !== 'success') {
    return {
      message: 'error',
      submission: submission.reply(),
      success: false,
    }
  }

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 3000)
  })

  return {
    message: 'success',
    submission: submission.reply({
      resetForm: true,
    }),
    success: true,
  }
}
