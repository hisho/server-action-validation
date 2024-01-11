'use server'

import { z } from 'zod'

export type ServerErrors = z.typeToFlattenedError<FormInput>['fieldErrors']
type MyActionResult =
  | {
      errors: ServerErrors
      message: string
      success: false
    }
  | {
      errors: undefined
      message: string
      success: true
    }

type AdditionalArguments = { userId: string }

const schema = z.object({
  name: z
    .string()
    .max(10, { message: 'server error 10文字以内で入力してください' }),
})

type FormInput = z.infer<typeof schema>

export const myAction = async (
  _: AdditionalArguments,
  input: FormInput
): Promise<MyActionResult> => {
  const result = schema.safeParse(input)
  if (result.success) {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 3000)
    })

    return {
      errors: undefined,
      message: 'success',
      success: true,
    }
  } else {
    return {
      errors: result.error.flatten().fieldErrors,
      message: 'error',
      success: false,
    }
  }
}
