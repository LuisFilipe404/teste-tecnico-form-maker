'use client'

import Button from '@/components/button'
import Top from '@/components/top'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function GalleryHeader() {
  const router = useRouter()

  return (
    <div>
      <Top title="Formulários" subtitle="Veja Seus Formulários e Compartilhe">
        <Button size="md" hasicon="t" onClick={() => router.push('/create')}>
          <Plus />
          Criar Novo Formulário
        </Button>
      </Top>
    </div>
  )
}
