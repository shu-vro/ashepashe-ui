import { Metadata } from "next";
import React from "react";
import ReportForm from "./ReportForm";

export const metadata: Metadata = {
    title: "Report",
};

export default function Page() {
    return (
        <div className="m-4 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mx-4">Report A Problem</h1>
            <ReportForm />
        </div>
    );
}
