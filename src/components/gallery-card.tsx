import { Clock, FileText, Pen } from 'lucide-react'
import Image from 'next/image'
import { Badge } from './ui/badge'
import dayjs from 'dayjs'

interface GalleryCardProps {
  cover: string | null
  title: string
  subtitle: string | null
  createdAt: Date
  questionCount?: number
  answersCount?: number
}

export default function GalleryCard({
  cover,
  title,
  subtitle,
  createdAt,
  questionCount,
  answersCount,
}: GalleryCardProps) {
  return (
    <li className="borde-gray-border overflow-hidden rounded-[16px] border">
      <div className="border-gray-border shadow-form h-[200px] w-full border-b">
        {cover ? (
          <Image
            src={`data:image/jpeg;base64,${cover}`}
            alt="Cover"
            width={400}
            height={200}
            className="h-full w-full rounded-[12px] bg-white object-cover"
          />
        ) : (
          <div className="bg-primary-400/20 text-primary-600 flex h-full w-full items-center justify-center">
            <FileText size={60} />
          </div>
        )}
      </div>
      <div className="bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-black-text text-lg font-semibold">{title}</h1>
            <span className="text-gray-text text-sm">
              {subtitle || 'Não Possui Subtitulo'}
            </span>
          </div>
          <Badge className="bg-green-600/70 font-semibold">Ativo</Badge>
        </div>
        <div className="space-y-1">
          <div className="text-gray-text flex items-center gap-1 text-sm">
            <Clock className="text-gray-text" size={14} />
            <span>Criado em {dayjs(createdAt).format('DD/MM/YYYY')}</span>
          </div>
          <div className="text-gray-text flex items-center gap-1 text-sm">
            <FileText className="text-gray-text" size={14} />
            <span>Possui {questionCount} Perguntas</span>
          </div>
          <div className="text-gray-text flex items-center gap-1 text-sm">
            <Pen className="text-gray-text" size={14} />
            <span>Possui {answersCount} Respostas</span>
          </div>
        </div>
      </div>
    </li>
  )
}
