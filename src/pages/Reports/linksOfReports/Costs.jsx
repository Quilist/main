import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function Costs() {
  useDocumentTitle("Залишки грошей");

  return <>
    <section className="home-section">
      <div className="home-content">
        Залишки грошей
      </div>
    </section>
  </>
}

export default Costs;