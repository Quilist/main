import DocumentTitle from "react-document-title";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
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
