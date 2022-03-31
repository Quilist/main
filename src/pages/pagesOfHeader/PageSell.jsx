import DocumentTitle from 'react-document-title'
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import Sell from "@/components/layout/Header/headersButtons/Sell";


const PageSell = () => {
  return (
    <DocumentTitle title='B-Fin: Продать'>
      <div >
        <Sidebar />
        <Sell />
      </div>
    </DocumentTitle>
  )
}
export default PageSell;