import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import styles from "../../styles/Home.module.css";

export default function LocaleSwitcher() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const handleChangeLocale = (event) => {
    const locale = event.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div className={styles.container}>
      <label
        htmlFor="locale-select"
        style={{ color: "black", marginBottom: "5px", fontSize: "24px" }}
      >
        {t("select-language")}
      </label>
      <select
        id="locale-select"
        className={styles.input}
        defaultValue={i18n.language}
        onChange={handleChangeLocale}
      >
        <option value="en">{t("English")}</option>
        <option value="es">{t("Español")}</option>
      </select>
    </div>
  );
}
