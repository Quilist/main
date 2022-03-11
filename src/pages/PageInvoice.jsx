import DocumentTitle from "react-document-title";
import Sidebar from "../sidebar/Sidebar";
import Invoice from "../invoice/Invoice";

const PageInvoice = () => {
  return (
    <DocumentTitle title="B-Fin: Счёт">
      <div>
        <Sidebar />
        <Invoice />
      </div>
    </DocumentTitle>
  );
};
export default PageInvoice;
