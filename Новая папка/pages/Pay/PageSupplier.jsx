import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Pay from "../../pay/PaySupplier";


const PageAllMoves = () => {
  return (
    <DocumentTitle title='B-Fin: Оплата Поставщику'>
      <div >
        <Sidebar />
        <Pay />
      </div>
    </DocumentTitle>
  )
}
export default PageAllMoves;