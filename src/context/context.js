import { createContext, useState, useEffect } from "react";

const ContextProvider = createContext();

export const ContextWrapper = ({ children }) => {
  const [dataUpload, setDataUpload] = useState([]);
  const [groupedSP, setGroupedSP] = useState([]);
  const [currentUA, setCurrentUA] = useState([]);
  const [incompleteModules, setIncompleteModules] = useState([]);
  const [userIncompleteCount, setUserIncompleteCount] = useState(0);
  const [modalData, setModalData] = useState({ open: false, person: [] });

  //Groups the personnel by service number
  useEffect(() => {
    let copiedData = [...dataUpload];
    let groupingViaCommonProperty = Object.values(
      copiedData.reduce((acc, current) => {
        acc[current.SERVICE_NO] = acc[current.SERVICE_NO] ?? [];
        acc[current.SERVICE_NO].push(current);
        return acc;
      }, {})
    );
    setGroupedSP(groupingViaCommonProperty);
  }, [dataUpload]);

  //Get current Unit Administrators
  useEffect(() => {
    let copiedData = [...dataUpload];
    let getAdmins = copiedData.filter(
      (ua) =>
        ua.JAMES_ROLE === "Unit_Admin" &&
        ua.JAMES_MODULE_COMPLETE_OR_INCOMPLETE === "Complete"
    );
    setCurrentUA(getAdmins);
  }, [dataUpload]);

  //Get all incomplete modules
  useEffect(() => {
    let copiedData = [...groupedSP];
    copiedData.map((person) =>
      person.map((module) => {
        if (Object.values(module).includes("Incomplete")) {
          setIncompleteModules((prevState) => [...prevState, module]);
        }
        return module;
      })
    );
  }, [groupedSP]);

  //Counts howmany personnel have incomplete modules
  useEffect(() => {
    let copiedData = [...incompleteModules];
    const getUniqueSP = copiedData.filter((obj, index) => {
      return (
        index === copiedData.findIndex((o) => obj.SERVICE_NO === o.SERVICE_NO)
      );
    });
    setUserIncompleteCount(getUniqueSP.length);
  }, [incompleteModules]);

  return (
    <ContextProvider.Provider
      value={{
        dataUpload,
        setDataUpload,
        groupedSP,
        currentUA,
        incompleteModules,
        userIncompleteCount,
        modalData,
        setModalData,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default ContextProvider;
