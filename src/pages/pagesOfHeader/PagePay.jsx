import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import Pay from "../../header/headersButtons/Pay";


const PagePay = () => {
  return (
    <DocumentTitle title='B-Fin: Оплатить'>
      <div >
        <Sidebar />
        <Pay />
      </div>
    </DocumentTitle>
  )
}
export default PagePay;