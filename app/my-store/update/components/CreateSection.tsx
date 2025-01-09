import { UserContext } from "@/contexts/UserContext";
import { use, useState } from "react";
import { WritableField } from "./Writable";
import { Button, Input } from "@nextui-org/react";
import { createSectionAction } from "./createSectionAction";
import { toast } from "sonner";

export default function CreateSection() {
    const useUser = use(UserContext);
    const [newSectionName, setNewSectionName] = useState("");

    return (
        <div className="w-full">
            <div className="more-product grid-in-more mt-6">
                <h2 className="text-2xl font-bold text-default-400 ml-4 flex flex-wrap justify-between items-center">
                    <span>
                        <WritableField
                            component={Input}
                            props={{
                                inputProps: {
                                    label: "Create Section",
                                    value: newSectionName,
                                    onValueChange: setNewSectionName,
                                },
                            }}>
                            {newSectionName}
                        </WritableField>{" "}
                    </span>
                    <Button
                        color="secondary"
                        onPress={async () => {
                            if (!newSectionName) {
                                return toast.error("Name is required");
                            }
                            const res = await createSectionAction({
                                name: newSectionName,
                                companyId: useUser?.userCompany?.id,
                            });

                            if (res.status === 200) {
                                toast.success(res.message);
                                setNewSectionName("");
                                useUser?.ticktock();
                            } else {
                                toast.error(
                                    `Error(${res.status}): ` + res.message
                                );
                            }
                        }}>
                        Create
                    </Button>
                </h2>
            </div>
        </div>
    );
}
