import { TrashIcon } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import type { AlertDialogProps, CardItemBase } from "~/types/types";


export function DeleteAlertDialog<T extends CardItemBase>({ index, item, setItem }: AlertDialogProps<T>) {

    const deleteItem = () => {
        setItem(prevItem => prevItem.filter((_, i) => i !== index));
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon" className="size-8 cursor-pointer" aria-label="Remove">
                    <TrashIcon className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#fef9f2]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete {item.name} and remove it from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500" onClick={deleteItem}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
