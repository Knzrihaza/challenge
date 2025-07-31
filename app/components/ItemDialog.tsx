import { useState } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { PencilIcon, PlusIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import type { CardItemBase, SelectOption } from "~/types/types";

type ItemDialogProps<T extends CardItemBase> = {
    item?: T;
    setItem: React.Dispatch<React.SetStateAction<T[]>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    index?: number;
    isTextArea?: boolean;
    allergiesPresets?: string[];
    selectIndicator?: SelectOption[];
    title: string;
};

export function ItemDialog<T extends CardItemBase>({
    item,
    setItem,
    open,
    setOpen,
    index,
    isTextArea,
    allergiesPresets,
    selectIndicator,
    title,
}: ItemDialogProps<T>) {
    const [input, setInput] = useState(item?.name || "");
    const [selected, setSelected] = useState(item?.selectItem || "");

    const newItem: T = {
        ...((item as T) || {}),
        name: input,
        selectItem: selected,
    };

    const editItem = () => {
        setItem((prev) =>
            prev.map((entry, i) =>
                i === index ? { ...entry, name: input, selectItem: selected } : entry
            )
        );
        setInput("");
        setSelected("");
        setOpen(false);
    };

    const addItem = () => {
        setItem((prev) => [...prev, newItem]);
        setInput("");
        setSelected("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    {item ? (
                        <Button
                            variant="default"
                            size="icon"
                            className="size-8 cursor-pointer"
                            aria-label="Edit"
                            onClick={() => {
                                setSelected(item.selectItem ?? "")
                                setInput(item?.name ?? "")
                            }
                            }
                        >
                            <PencilIcon className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            variant="default"
                            size="icon"
                            className="size-8 cursor-pointer"
                            aria-label="Add"
                            onClick={() => {
                                setInput("")
                                setSelected("")

                            }}

                        >
                            <PlusIcon className="h-4 w-4" />
                        </Button>
                    )}
                </DialogTrigger>

                <DialogContent className="bg-[#fef9f2] sm:max-w-[425px]">
                    <DialogHeader>


                        {!item ? (
                            <div>
                                <DialogTitle>Add new {title}</DialogTitle>

                            </div>
                        ) : (
                            <div>
                                <DialogTitle>Edit {title}</DialogTitle>

                            </div>
                        )}
                        <DialogDescription>
                            Make changes or add new {title} here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            {allergiesPresets && allergiesPresets.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {allergiesPresets.map((preset) => (
                                        <Badge
                                            key={preset}
                                            variant="secondary"
                                            className="cursor-pointer bg-orange-300"
                                            onClick={() => setInput(preset)}
                                        >
                                            {preset}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {!isTextArea ? (
                                <div>
                                    <label>Enter Name Here:</label>

                                    <Input
                                        required
                                        defaultValue={input}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        id="name"
                                        name="name"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label>Enter Note Here: </label>
                                    <Textarea
                                        required
                                        maxLength={500}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Add any notes here: texture, religious restrictions, etc."
                                    />
                                    <p className="text-sm text-muted-foreground text-right mt-1">
                                        {input.length} / 500 characters
                                    </p>
                                </div>
                            )}

                            {selectIndicator && (
                                <div>
                                    <label>Please Select Option</label>
                                    <Select
                                        required
                                        defaultValue={selected}
                                        value={selected}
                                        onValueChange={(value) => setSelected(value)}
                                    >
                                        <SelectTrigger className="border w-full rounded px-2">
                                            <SelectValue placeholder="none" />
                                        </SelectTrigger>
                                        <SelectContent className="w-full">
                                            {selectIndicator.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.placeholder}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>

                        {item ? (
                            <Button
                                onClick={editItem}
                                disabled={
                                    !input || ((selectIndicator?.length ?? 0) > 0 && !selected)
                                }
                            >
                                Save changes
                            </Button>
                        ) : (
                            <Button
                                onClick={addItem}
                                disabled={
                                    !input || ((selectIndicator?.length ?? 0) > 0 && !selected)
                                }
                            >
                                Add {title}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
