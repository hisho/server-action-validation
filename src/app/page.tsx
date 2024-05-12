import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <div>
        <Link href={'/react-hook-form'}>react-hook-form</Link>
      </div>
      <div>
        <Link href={'/conform'}>conform</Link>
      </div>
    </div>
  )
}
