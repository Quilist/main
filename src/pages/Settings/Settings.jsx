import * as React from "react";
import {useDocumentTitle} from "@/hooks/useDocumentTitle";

function Settings() {
  useDocumentTitle("Настройки");

  return <>
    <section className="home-section">
      <div className="home-content">
        Настройки
      </div>
    </section>
  </>
}

export default Settings;

