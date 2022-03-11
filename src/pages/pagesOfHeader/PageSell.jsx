import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import Sell from "../../header/headersButtons/Sell";


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