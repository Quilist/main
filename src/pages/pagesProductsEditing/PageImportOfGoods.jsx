import ImportOfGoods from "../../productsAndServices/productsEditing/ImportOfGoods"
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import DocumentTitle from 'react-document-title'

function PageImportOfGoods() {
  return (
    <DocumentTitle title='B-Fin: Импорт товаров'><div>
      <Sidebar />
      <ImportOfGoods/>
    </div></DocumentTitle>

  )
}

export default PageImportOfGoods;