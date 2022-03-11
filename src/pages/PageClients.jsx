import DocumentTitle from 'react-document-title'
import Sidebar from '../sidebar/Sidebar';
import EnhancedTable from '../clients/Clients';


const PageClients = () => {
  return (
    <DocumentTitle title='B-Fin: Клиенты'>
      <div >
        <Sidebar />
        <EnhancedTable />
      </div>
    </DocumentTitle>
  )
}
export default PageClients;