import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { SlCheck, SlBan, SlEarphonesAlt } from "react-icons/sl";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

// Check if Firebase has already been initialized
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyCwKp8Fnm5lvo2WzygBEwkHNuzxfIprDWY",
    authDomain: "intern-app-tracker-404dc.firebaseapp.com",
    databaseURL: "https://intern-app-tracker-404dc-default-rtdb.firebaseio.com",
    projectId: "intern-app-tracker-404dc",
    storageBucket: "intern-app-tracker-404dc.appspot.com",
    messagingSenderId: "4332158854",
    appId: "1:4332158854:web:5e0f447cd085d5e0d63607",
    measurementId: "G-612F92T5DB"
  };
  firebase.initializeApp(firebaseConfig);
}

const dataRef = firebase.database().ref("data");

export default function StatsPage() {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [dataFromFirebase, setDataFromFirebase] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = () => {
      dataRef.on("value", (snapshot) => {
        const data = snapshot.val();

        // Convert data to an array
        const dataArray = Object.entries(data).map(([id, entry]) => ({
          id,
          jobTitle: entry.jobTitle,
          jobCompany: entry.jobCompany,
          jobStatus: entry.jobStatus,
        }));

        setDataFromFirebase(dataArray);
      });
    };

    fetchDataFromFirebase();

    // Cleanup the listener when the component unmounts
    return () => {
      dataRef.off("value");
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleStatusChange = (itemId, newStatus) => {
    // Update item.jobStatus when a button is clicked
    dataRef.child(itemId).update({ jobStatus: newStatus });
  };

  const pages = Math.ceil(dataFromFirebase.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return dataFromFirebase.slice(start, end);
  }, [page, dataFromFirebase]);
  
  return (
    <div className="w-3/4 mx-auto flex items-center justify-center h-screen">
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn>JOB TITLE</TableColumn>
          <TableColumn>COMPANY</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.jobTitle}</TableCell>
              <TableCell>{item.jobCompany}</TableCell>
              <TableCell>
                <span
                  style={{
                    backgroundColor: getStatusColorBg(item.jobStatus),
                    color: "white",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.375rem",
                    border: `1px solid ${getStatusColorBorder(item.jobStatus)}`,
                    boxShadow: `0 0 10px ${getStatusGlowColor(item.jobStatus)}`,
                  }}
                >
                  {item.jobStatus}
                </span>
              </TableCell>
              <TableCell>
                <button onClick={() => handleStatusChange(item.id, "Accepted")}>
                  <SlCheck />
                </button>
                <button onClick={() => handleStatusChange(item.id, "Denied")}>
                  <SlBan />
                </button>
                <button onClick={() => handleStatusChange(item.id, "Interview")}>
                  <SlEarphonesAlt />
                </button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// Helper function to determine background color based on status
const getStatusColorBg = (status) => {
  switch (status) {
    case "Accepted":
      return "rgb(22 101 52)";
    case "Denied":
      return "rgb(153 27 27)";
    case "Interview":
      return "rgb(17 94 89)";
    default:
      return "transparent";
  }
};

// Helper function to determine glow color based on status
const getStatusGlowColor = (status) => {
  switch (status) {
    case "Accepted":
      return "rgb(22 101 52)"; // Green
    case "Denied":
      return "rgb(153 27 27)"; // Red
    case "Interview":
      return "rgb(17 94 89)"; // Yellow
    default:
      return "transparent";
  }
};

const getStatusColorBorder = (status) => {
  switch (status) {
    case "Accepted":
      return "rgb(34 197 94)";
    case "Denied":
      return "rgb(220 38 38)";
    case "Interview":
      return "rgb(45 212 191)";
    default:
      return "transparent";
  }
}