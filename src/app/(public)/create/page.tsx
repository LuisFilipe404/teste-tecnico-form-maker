'use client'

import Form from './components/form'
import CreateHeader from './components/header'
import ToolBar from './components/tool-bar'
import { useForm } from 'react-hook-form'
import { formSchemaZod, type IFormCreate } from '@/models/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormStore } from './store/form-store'
import { useRouter } from 'next/navigation'

export default function FormBuilderMainPage() {
  const saveData = useFormStore((state) => state.saveForm)
  const router = useRouter()

  const { watch, setValue, handleSubmit } = useForm<IFormCreate>({
    defaultValues: {
      title: 'Formulário sem Título',
      subtitle: '',
      cover: null,
    },
    resolver: zodResolver(formSchemaZod),
  })

  const handleSubmitForm = async (data: IFormCreate) => {
    const formData = new FormData()

    formData.append('title', data.title ?? 'Formulário sem Título')
    formData.append('subtitle', data.subtitle ?? '')
    formData.append('cover', data.cover ?? '')

    await saveData(formData)

    router.push('/')
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="w-full">
      <CreateHeader />
      <div className="mt-8 mb-8 flex w-full flex-col-reverse items-center gap-8 xl:grid xl:grid-cols-[68%_30%] xl:items-start">
        <Form setValue={setValue} watch={watch} />
        <ToolBar />
      </div>
    </form>
  )
}
