import SavePriceList from "@/pages/ProductsAndServices/productsEditing/SavePriceList"
import Sidebar from "@/components/layout/Sidebar/Sidebar";
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