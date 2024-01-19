import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { SlCheck, SlBan, SlEarphonesAlt, SlTrash } from "react-icons/sl";
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
  
        // Check if data is not null or undefined
        if (data) {
          // Convert data to an array
          const dataArray = Object.entries(data).map(([id, entry]) => ({
            id,
            jobTitle: entry.jobTitle,
            jobCompany: entry.jobCompany,
            jobStatus: entry.jobStatus,
          }));
  
          setDataFromFirebase(dataArray);
        } else {
          // If data is null or undefined, set an empty array
          setDataFromFirebase([]);
        }
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

  const handleDeleteEntry = (itemId) => {
    // Delete the entry when the delete icon is clicked
    dataRef.child(itemId).remove();
  };

  const pages = Math.ceil(dataFromFirebase.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return dataFromFirebase.slice(start, end);
  }, [page, dataFromFirebase]);
  
  return (
    <div className="flex w-11/12 sm:w-1/2 mx-auto items-center justify-center h-screen">
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
          <TableColumn className="text-center sm:text-xl sm:py-4">JOB TITLE</TableColumn>
          <TableColumn className="text-center sm:text-xl sm:py-4">COMPANY</TableColumn>
          <TableColumn className="text-center sm:text-xl  sm:py-4l">STATUS</TableColumn>
          <TableColumn className="text-center sm:text-xl sm:py-4">ACTIONS</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id} className="text-center">
              <TableCell className="text-lg">{item.jobTitle}</TableCell>
              <TableCell className="text-lg">{item.jobCompany}</TableCell>
              <TableCell>
                <span
                  style={{
                    backgroundColor: getStatusColorBg(item.jobStatus),
                    color: "white",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.375rem",
                    border: `1.5px solid ${getStatusColorBorder(item.jobStatus)}`,
                    boxShadow: `0 0 10px ${getStatusGlowColor(item.jobStatus)}`,
                  }}
                >
                  {item.jobStatus}
                </span>
              </TableCell>
              <TableCell>
              <button onClick={() => handleStatusChange(item.id, "Accepted")} className="ease-in-out duration-75 mr-3 text-lg hover:text-green-600">
                <SlCheck />
              </button>
              <button onClick={() => handleStatusChange(item.id, "Denied")} className="ease-in-out duration-75 mr-3 text-lg hover:text-red-600">
                <SlBan />
              </button>
              <button onClick={() => handleStatusChange(item.id, "Interview")} className="ease-in-out duration-75 mr-3 text-lg hover:text-teal-600">
                <SlEarphonesAlt />
              </button>
              <button onClick={() => handleDeleteEntry(item.id)} className="ease-in-out duration-75 mr-3 text-lg hover:text-red-600">
                  <SlTrash />
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
    case "Applied":
      return "rgb(180 83 9)";
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
    case "Applied":
      return "rgb(180 83 9)"; // Yellow
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
    case "Applied":
      return "rgb(251 191 36)";
    default:
      return "transparent";
  }
}