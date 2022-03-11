import DocumentTitle from 'react-document-title'
import Sidebar from "../../sidebar/Sidebar";
import PriceList from "../../reports/linksOfReports/PriceList";


const PagePriceList = () => {
  return (
    <DocumentTitle title='B-Fin: Прайс Лист'>
      <div >
        <Sidebar />
        <PriceList />
      </div>
    </DocumentTitle>
  )
}
export default PagePriceList;