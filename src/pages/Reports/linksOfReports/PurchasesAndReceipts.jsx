import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function PurchasesAndReceipts() {
  useDocumentTitle("Звіт постачання");

  return <>
    <section className="home-section">
      <div className="home-content">
        Звіт постачання
      </div>
    </section>
  </>
}

export default PurchasesAndReceipts;