import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import BuyCreate from "../../header/headersButtons/BuyCreate";


const PageBuy = () => {
  return (
    <DocumentTitle title='B-Fin: Купить'>
      <div >
        <Sidebar />
        <BuyCreate />
      </div>
    </DocumentTitle>
  )
}
export default PageBuy;