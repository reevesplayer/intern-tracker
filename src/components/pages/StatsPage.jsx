import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
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

  const pages = Math.ceil(dataFromFirebase.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return dataFromFirebase.slice(start, end);
  }, [page, dataFromFirebase]);

  return (
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
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.jobTitle}</TableCell>
            <TableCell>{item.jobCompany}</TableCell>
            <TableCell>{item.jobStatus}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
