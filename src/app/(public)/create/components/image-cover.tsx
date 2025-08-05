import type { IForm } from '@/models/form'
import { Image as ImageIcon, Plus } from 'lucide-react'
import Image from 'next/image'
import type { UseFormSetValue } from 'react-hook-form'
import toast from 'react-hot-toast'

interface ImageCoverProps {
  setValue: UseFormSetValue<IForm>
  value: File | null
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png']

export default function ImageCover({ setValue, value }: ImageCoverProps) {
  return (
    <div className="from-gray-1 to-gray-2 relative flex h-[240px] w-full flex-col items-center justify-center gap-4 bg-linear-90">
      {value ? (
        <Image
          src={URL.createObjectURL(value)}
          alt="Capa do Formulário"
          className="h-full w-full object-cover"
          width={1024}
          height={240}
          quality={100}
        />
      ) : (
        <>
          <div className="shadow-icon text-gray-3 flex size-16 items-center justify-center rounded-[16px] bg-white">
            <ImageIcon size={30} />
          </div>
          <span className="text-gray-text/80 text-lg">
            Adicione uma Imagem de Capa
          </span>
        </>
      )}
      <label
        htmlFor="image-cover"
        className="shadow-form text-black-text absolute right-6 bottom-6 flex cursor-pointer items-center justify-between gap-2 rounded-[12px] bg-white px-4 py-3"
      >
        <Plus size={20} />
        {value ? 'Alterar Capa' : 'Adicionar Capa'}
      </label>
      <input
        type="file"
        id="image-cover"
        hidden
        accept="image/jpeg, image/png"
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : null

          if (file) {
            if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
              toast.error(
                'Formato de arquivo inválido. Por favor, envie uma imagem JPEG ou PNG.',
              )
              return
            }

            if (file.size > MAX_IMAGE_SIZE) {
              toast.error(
                'O arquivo é muito grande. O tamanho máximo permitido é 5MB.',
              )
              return
            }
          }

          setValue('cover', e.target.files ? e.target.files[0] : null)
        }}
      />
    </div>
  )
}
