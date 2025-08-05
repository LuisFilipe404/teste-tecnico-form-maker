import getForms from '@/actions/get-forms'
import GalleryHeader from './components/gallery-header'
import GalleryCard from '@/components/gallery-card'

export default async function HomePage() {
  const forms = await getForms()

  return (
    <div>
      <GalleryHeader />
      {forms.length === 0 ? (
        <div className="text-muted-foreground mt-8 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-lg font-semibold">
            Nenhum formulário cadastrado ainda.
          </p>
          <p className="text-sm">Crie um novo formulário para começar.</p>
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {forms.map((form) => (
            <GalleryCard
              key={form.id}
              subtitle={form.subtitle}
              cover={form.cover}
              createdAt={form.createdAt}
              title={form.title}
              questionCount={form.questions.length}
              answersCount={0}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
