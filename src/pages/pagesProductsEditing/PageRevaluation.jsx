import Revaluation from "../../productsAndServices/productsEditing/Revaluation"
import Sidebar from "../../sidebar/Sidebar";
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