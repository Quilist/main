import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function SalesAndOrders() {
  useDocumentTitle("Звіт реалізація");
  return <>
    <section className="home-section">
      <div className="home-content">
        Звіт реалізація
      </div>
    </section>
  </>
}

