import Revaluation from "../../productsAndServices/productsEditing/Revaluation"
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import DocumentTitle from 'react-document-title'

function PageRevaluation() {
  return (
    <DocumentTitle title='B-Fin: Переоценка'><div>
      <Sidebar />
      <Revaluation/>
    </div></DocumentTitle>

  )
}

export default PageRevaluation;