import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import Buy from "../../header/headersButtons/Buy";


const PageBuy = () => {
  return (
    <DocumentTitle title='B-Fin: Купить'>
      <div >
        <Sidebar />
        <Buy />
      </div>
    </DocumentTitle>
  )
}
export default PageBuy;