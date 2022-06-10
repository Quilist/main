import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function Debts() {
  useDocumentTitle("Звіт борги");

  return <>
    <section className="home-section">
      <div className="home-content">
        Звіт борги
      </div>
    </section>
  </>
}

export default Debts;