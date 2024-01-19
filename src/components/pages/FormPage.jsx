import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import firebase from 'firebase/compat/app'; // Adjusted import statement
import 'firebase/compat/database'; // Adjusted import statement

function FormPage() {
    const [jobTitle, setJobTitle] = useState('');
    const [jobCompany, setJobCompany] = useState('');
    const [jobStatus] = useState('Applied');

    function jobTitleHandler(e) {
        setJobTitle(e.target.value)
    }

    function jobCompanyHandler(e) {
        setJobCompany(e.target.value)
    }

    async function submitHandler(e) {
        e.preventDefault();

        if (jobTitle.trim().length === 0 || jobCompany.trim().length === 0) {
            return;
        }

        const data = {
            jobTitle: jobTitle,
            jobCompany: jobCompany,
            jobStatus: jobStatus,
        };

        try {
            // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }

            const database = firebase.database();
            const response = await database.ref('data').push(data);
            console.log(response);

            setJobTitle('');
            setJobCompany('');
            
            console.log('Input Field Cleared')

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <form>
            <div className="w-11/12 flex flex-col gap-4 sm:w-1/6 mx-auto items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">Add a New Job</h1>
            <Input onChange={jobTitleHandler} isRequired type="text" label="Job Title" placeholder="Enter the job title" value={jobTitle} />
            <Input onChange={jobCompanyHandler} isRequired type="text" label="Job Company" placeholder="Enter the company name" value={jobCompany} />
            <Button onClick={submitHandler} radius="full" className="bg-gradient-to-tr from-blue-500 to-teal-500 text-white shadow-lg">
                Add Job
            </Button>
            </div>

            </form>
        </div>
    );
}

export default FormPage;
