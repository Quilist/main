import DocumentTitle from 'react-document-title'
import Sidebar from "@/sidebar/Sidebar";
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