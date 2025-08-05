'use client'

import Button from '@/components/button'
import Top from '@/components/top'
import { Save } from 'lucide-react'

export default function CreateHeader() {
  return (
    <div>
      <Top
        title="Criar Novo Formulário"
        subtitle="Customize o Layout do Seu Formulário e Adicione Novos Campos"
      >
        <Button hasicon="t" type="submit">
          <Save />
          Salvar Formulário
        </Button>
      </Top>
    </div>
  )
}
