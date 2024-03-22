/**
 * This is a playground component to test the package functionality.
 */
import React from "react";

import { Localize, localize, useTranslations } from "@/index";

type TPlayground = {
  translationData: Record<string, string>;
  languages: string[];
};

export default function Playground({
  translationData,
  languages,
}: TPlayground) {
  const { localize: t, switchLanguage, currentLang } = useTranslations();

  const [urlInput, setUrlInput] = React.useState("");
  const [urlInputError, setUrlInputError] = React.useState("");

  const changeLanguage = (lng: string) => {
    switchLanguage(lng);
  };

  const handleSubmit = () => {
    // validate urlInput as proper input
    if (!urlInput) {
      setUrlInputError("Please enter a valid url");
      return;
    } else if (!urlInput.startsWith("https://")) {
      setUrlInputError("Please enter a valid url");
      return;
    } else if (urlInputError) {
      setUrlInputError("");
    }

    localStorage.setItem("cdnUrl", urlInput);
    window.location.reload();
  };

  return (
    <div>
      <div>
        <div>
          <input
            value={urlInput}
            style={{
              padding: "0.5rem",
              margin: "0.5rem",
              borderRadius: "5px",
              border: "1px solid #000",
              width: "400px",
            }}
            onChange={({ target }) => setUrlInput(target.value)}
            placeholder="https://pub-5ce11fcb15f34c0a9ce8ba7086d16e6a.r2.dev"
          />
          {urlInputError && <span>{urlInputError}</span>}
        </div>

        <button
          onClick={handleSubmit}
          className="translations-playground-m-low translations-playground-btn"
        >
          Submit translation source
        </button>
      </div>

      <div>
        {languages.map((lng) => (
          <button
            className="translations-playground-m-low translations-playground-btn"
            key={lng}
            type="button"
            onClick={() => changeLanguage(lng)}
          >
            {lng}
          </button>
        ))}
      </div>
      <div>
        <div style={{ flex: 1, display: 'flex' }}>
          <div className="translations-playground-card translations-playground-bg-lightgray">
            <h1>
              <code>localize</code> function from <code>useTranslations</code>
            </h1>
            <div>{t("Reports")}</div>
          </div>

          <div className="translations-playground-card translations-playground-bg-skyblue">
            <h1>
              Deprecated <code>localize</code> function
            </h1>
            <div>{localize("Reports")}</div>
          </div>

          <div className="translations-playground-card translations-playground-bg-lightgray">
            <h1>
              <code>Localize</code> component
            </h1>
            <div>
              <Localize
                i18n_default_text="Earn a range of payouts by correctly predicting market movements with <0>options</0>, or get the upside of CFDs without risking more than your initial stake with <1>multipliers</1>."
                components={[
                  <div
                    className={`${
                      currentLang === "EN"
                        ? "translations-playground-bg-skyblue"
                        : ""
                    }`}
                  />,
                  <div
                    className={`${
                      currentLang === "EN"
                        ? "translations-playground-bg-skyblue"
                        : ""
                    }`}
                  />,
                ]}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {languages.map((lng) => (
            <div style={{flex: 0.5}}>
              <h1>{lng}</h1>
              <div
                key={lng}
                style={{
                  maxHeight: "400px",
                  marginBottom: "1rem",
                  borderRadius: 40,
                  background: "lightyellow",
                  overflow: "scroll",
                  padding: "1rem",
                }}
              >
                  <code style={{ lineHeight: "1.5rem", fontWeight: "bold" }}>
                    {JSON.stringify(translationData?.[lng], null, 4)}
                  </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
