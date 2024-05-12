import { Form } from '@/app/conform/_component/form'

export default function () {
  return (
    <main>
      <div className={'mx-auto w-full max-w-xl'}>
        <h1 className={'text-4xl uppercase'}>Form</h1>
        <Form className={'flex flex-col'} />
      </div>
    </main>
  )
}
