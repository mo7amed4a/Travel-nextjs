import { redirect } from 'next/navigation'

export default function auth() {
  redirect('/auth/login')
}
