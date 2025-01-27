"use client";

import { Button, Form, Textarea } from "@heroui/react";
import React, { useActionState } from "react";
import { reportAction } from "./reportAction";
import { toast } from "sonner";

export default function ReportForm() {
    const [state, formAction, isPending] = useActionState(reportAction, null);
    React.useEffect(() => {
        if (state === null) return;
        console.log(state);
        if (state?.status === 200) {
            toast.success(`Report submitted successfully`);
        } else {
            toast.error(`Error(${state.status}): ${state.message}`);
        }
        return () => {};
    }, [state]);

    return (
        <Form action={formAction} className="m-4">
            <Textarea
                label="Report"
                placeholder="Write your report"
                name="report"
                minRows={8}
            />
            <Button
                color="primary"
                className="font-bold"
                isLoading={isPending}
                type="submit">
                Submit your Problem
            </Button>
        </Form>
    );
}
