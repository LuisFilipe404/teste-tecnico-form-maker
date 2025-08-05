import Form from './components/form'
import CreateHeader from './components/header'
import ToolBar from './components/tool-bar'

export default function FormBuilderMainPage() {
  return (
    <div>
      <CreateHeader />
      <div className="mt-8 mb-8 grid w-full grid-cols-[68%_30%] items-start gap-8">
        <Form />
        <ToolBar />
      </div>
    </div>
  )
}
