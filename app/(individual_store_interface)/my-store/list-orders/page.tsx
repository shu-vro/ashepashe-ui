"use client";

import React, { use } from "react";
import CompanyOrderTable from "./CompanyOrderTable";
import { UserContext } from "@/contexts/UserContext";

export default function Page() {
    const useUser = use(UserContext);
    if (!useUser) return null;
    if (!useUser.userCompany) return `You don't have a company yet.`;
    return (
        <div>
            <h1 className="my-3 text-3xl font-bold">My Orders:</h1>
            <div className="mt-8 mx-3">
                <CompanyOrderTable
                    data={useUser.companyOrders || []}
                    ticktock={useUser.ticktock}
                />
            </div>
        </div>
    );
}
