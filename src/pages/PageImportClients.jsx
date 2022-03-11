import DocumentTitle from "react-document-title";
import Sidebar from "../sidebar/Sidebar";
import ImportClients from "../importClients/ImportClients";

const PageImportClients = () => {
  return (
    <DocumentTitle title="B-Fin: Импортировать клиентов">
      <div>
        <Sidebar />
        <ImportClients />
      </div>
    </DocumentTitle>
  );
};
export default PageImportClients;