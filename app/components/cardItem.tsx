import type { CardItemBase, CardItemProps } from "~/types/types";
import { Badge } from "./ui/badge";
import { DeleteAlertDialog } from "./alertDialog";
import { useState } from "react";
import { ItemDialog } from "./ItemDialog";


export const CardItem = <T extends CardItemBase>({ allergiesPresets, item, setItem, index, isTextArea, selectIndicator, title }: CardItemProps<T>) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="bg-[#fef9f2] border-2 px-4 py-2 w-full">
            <div className="max-w-full flex items-center justify-between text-gray-700 px-1 py-2">
                <div className="flex flex-col max-w-[70%]">
                    <h2 className="text-base font-medium truncate">
                        {item.name || item.note}
                    </h2>
                    {item.selectItem && <Badge>{item.selectItem}</Badge>}
                </div>

                <div className="flex gap-2">
                    <ItemDialog
                        setItem={setItem}
                        open={open}
                        setOpen={setOpen}
                        item={item}
                        index={index}
                        isTextArea={isTextArea}
                        selectIndicator={selectIndicator}
                        title={title}
                        allergiesPresets={allergiesPresets}

                    />
                    <DeleteAlertDialog<T> item={item} index={index} setItem={setItem} />
                </div>
            </div>
        </div>


    )
}