import type { BaseItem } from "~/components/ItemDialog";

export type DislikedFood = { name: string; selectItem: string }
export type FoodAllergies = { name: string; selectItem: string }
export type FoodNotes = { note: string }
export type FavoriteFood = { name: string; selectItem: string }

export type FoodItem = FavoriteFood | DislikedFood | FoodAllergies | FoodNotes;

export type SelectOption = {
    placeholder: string;
    value: string;
};


export type CustomCardProps = {
    title: string;
    isTextArea?: boolean;
    // Optional props
    favorites?: FavoriteFood[];
    setFavorites?: React.Dispatch<React.SetStateAction<FavoriteFood[]>>;

    dislikes?: DislikedFood[];
    setDislikes?: React.Dispatch<React.SetStateAction<DislikedFood[]>>;

    allergies?: FoodAllergies[];
    setAllergies?: React.Dispatch<React.SetStateAction<FoodAllergies[]>>;

    notes?: FoodNotes[];
    setNotes?: React.Dispatch<React.SetStateAction<FoodNotes[]>>;

    allergiesPresets?: string[];

    selectIndicator?: SelectOption[];
};

export type CardItemBase = {
    name?: string;
    selectItem?: string;
    note?: string;
};

export type CardItemProps<T extends CardItemBase> = {
    title: string;
    item: T;
    setItem: React.Dispatch<React.SetStateAction<T[]>>;
    index: number;
    isTextArea?: boolean
    selectIndicator?: SelectOption[];
};

export type AlertDialogProps<T extends CardItemBase> = {
    item: T;
    setItem: React.Dispatch<React.SetStateAction<T[]>>;
    index: number;
};