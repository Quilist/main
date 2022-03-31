import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Pay from "@/components/layout/Header/headersButtons/Pay";


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