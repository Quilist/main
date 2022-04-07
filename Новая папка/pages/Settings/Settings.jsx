import * as React from "react";

function Settings() {
  React.useEffect(() => {
    document.title = "B-Fin: Настройки"
    // eslint-disable-next-line
  }, [])

  return <>
    <section className="home-section">
      <div className="home-content">
        Настройки
      </div>
    </section>
  </>
}

export default Settings;

