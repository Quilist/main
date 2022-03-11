import SavePriceList from "../../productsAndServices/productsEditing/SavePriceList"
import Sidebar from "../../sidebar/Sidebar";
import DocumentTitle from 'react-document-title'

function PageSavePriceList() {
  return (
    <DocumentTitle title='B-Fin: Скачать прайс-лист'><div>
      <Sidebar />
      <SavePriceList/>
    </div></DocumentTitle>

  )
}

export default PageSavePriceList;