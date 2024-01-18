import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import firebase from 'firebase/compat/app'; // Adjusted import statement
import 'firebase/compat/database'; // Adjusted import statement

function FormPage() {
    const [jobTitle, setJobTitle] = useState('');
    const [jobCompany, setJobCompany] = useState('');
    const [jobStatus, setJobStatus] = useState('');

    function jobTitleHandler(e) {
        setJobTitle(e.target.value)
    }

    function jobCompanyHandler(e) {
        setJobCompany(e.target.value)
    }

    function jobStatusHandler(e) {
        setJobStatus(e.target.value)
    }

    async function submitHandler(e) {
        e.preventDefault();

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
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <div>
                <h1>ADD JOB</h1>
            </div>
            <div>
                <form onSubmit={submitHandler}>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                    <Input type="email" label="Email" />
                    <Input type="email" label="Email" placeholder="Enter your email" />
                </div>
                </form>
            </div>
        </div>
    );
}

export default FormPage;
