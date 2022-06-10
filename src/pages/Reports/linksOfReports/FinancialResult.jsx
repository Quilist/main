import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function FinancialResult() {
  useDocumentTitle("Фінансовий результат");

  return <>
    <section className="home-section">
      <div className="home-content">
        Фінансовий результат
      </div>
    </section>
  </>
}

export default FinancialResult;