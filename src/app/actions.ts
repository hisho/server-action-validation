'use server'

type MyActionResult = {
  type: 'MY_ACTION'
}

type AdditionalArguments = { hoge: string }
type InputData = FormData

export const myAction = async (
  { hoge }: AdditionalArguments,
  formData: InputData
): Promise<MyActionResult> => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 3000)
  })
  console.log(hoge, formData)
  return { type: 'MY_ACTION' }
}
