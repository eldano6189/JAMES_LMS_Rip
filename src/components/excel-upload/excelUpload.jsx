import styles from "./excelUpload.module.css";
import * as XLSX from "xlsx";
import { useContext } from "react";
import ContextProvider from "../../context/context";

const ExcelUpload = () => {
  const { setDataUpload } = useContext(ContextProvider);

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsBinaryString(e.target.files[0]);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetname = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetname];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        for (let i = 0; i < parsedData.length; i++) {
          let obj = parsedData[i];
          Object.keys(obj).forEach((key) => {
            var replacedKey = key.trim().toUpperCase().replaceAll(" ", "_");
            if (key !== replacedKey) {
              obj[replacedKey] = obj[key];
              delete obj[key];
            }
          });
        }

        setDataUpload(parsedData);
      };
    }
  };

  return (
    <form>
      <input
        className={styles.upload}
        type="file"
        name="upload"
        onChange={readUploadFile}
      />
    </form>
  );
};

export default ExcelUpload;
