import UserEditing from "../userEditing/UserEditing";
import DocumentTitle from 'react-document-title'
import Sidebar from '../sidebar/Sidebar';

function PageUserEditing() {
  return (
    <DocumentTitle title='B-Fin: Изменить клиента'><div>
      <Sidebar />
      <UserEditing />
    </div></DocumentTitle>

  )
}

export default PageUserEditing;