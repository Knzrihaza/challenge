import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { CardItem } from "./cardItem";
import { ItemDialog } from "./ItemDialog";
import type {
    CustomCardProps,
    DislikedFood,
    FavoriteFood,
    FoodAllergies,
    FoodNotes,
} from "~/types/types";
import { favoriteCategoryIndicator } from "~/mockData/mockData";

export const CustomCard = ({
    title,
    favorites,
    setFavorites,
    dislikes,
    setDislikes,
    allergies,
    setAllergies,
    notes,
    setNotes,
    isTextArea,
    allergiesPresets,
    selectIndicator,
}: CustomCardProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <Card className="bg-[#fef9f2] px-0">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle>{title}</CardTitle>

                    {favorites && setFavorites && (
                        <ItemDialog<FavoriteFood>
                            setItem={setFavorites}
                            open={modalOpen}
                            setOpen={setModalOpen}
                            selectIndicator={favoriteCategoryIndicator}
                            title={title}
                        />
                    )}

                    {dislikes && setDislikes && (
                        <ItemDialog<DislikedFood>
                            setItem={setDislikes}
                            open={modalOpen}
                            setOpen={setModalOpen}
                            selectIndicator={selectIndicator}
                            title={title}
                        />
                    )}

                    {allergies && setAllergies && (
                        <ItemDialog<FoodAllergies>
                            setItem={setAllergies}
                            open={modalOpen}
                            setOpen={setModalOpen}
                            allergiesPresets={allergiesPresets}
                            selectIndicator={selectIndicator}
                            title={title}
                        />
                    )}

                    {notes && setNotes && (
                        <ItemDialog<FoodNotes>
                            setItem={setNotes}
                            open={modalOpen}
                            setOpen={setModalOpen}
                            isTextArea={isTextArea}
                            title={title}
                        />
                    )}
                </div>
            </CardHeader>

            <CardContent className="text-sm text-gray-700 gap-2 space-y-4">
                {favorites && setFavorites && (
                    favorites.length > 0 ? (
                        selectIndicator?.map((indicator) => {
                            const itemsInCategory = favorites.filter(
                                (fav) =>
                                    fav.selectItem?.toLowerCase() ===
                                    indicator.value.toLowerCase()
                            );

                            if (itemsInCategory.length === 0) return null;

                            return (
                                <div key={indicator.value} className="mb-4">
                                    <h3 className="font-semibold text-sm text-gray-700 mb-2">
                                        {indicator.placeholder}
                                    </h3>
                                    <div className="space-y-2">
                                        {itemsInCategory.map((item, i) => (
                                            <CardItem<FavoriteFood>
                                                key={`${indicator.value}-${i}`}
                                                item={item}
                                                setItem={setFavorites}
                                                index={favorites.indexOf(item)}
                                                selectIndicator={selectIndicator}
                                                title={title}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center italic text-gray-500">
                            No favorites found.
                        </p>
                    )
                )}

                {dislikes && setDislikes && (
                    dislikes.length > 0 ? (
                        dislikes.map((item, i) => (
                            <CardItem<DislikedFood>
                                key={i}
                                item={item}
                                setItem={setDislikes}
                                index={i}
                                selectIndicator={selectIndicator}
                                title={title}
                            />
                        ))
                    ) : (
                        <p className="text-center italic text-gray-500">
                            No dislikes found.
                        </p>
                    )
                )}

                {allergies && setAllergies && (
                    allergies.length > 0 ? (
                        allergies.map((item, i) => (
                            <CardItem<FoodAllergies>
                                key={i}
                                item={item}
                                setItem={setAllergies}
                                index={i}
                                selectIndicator={selectIndicator}
                                title={title}

                            />
                        ))
                    ) : (
                        <p className="text-center italic text-gray-500">
                            No allergies found.
                        </p>
                    )
                )}

                {notes && setNotes && (
                    notes.length > 0 ? (
                        notes.map((item, i) => (
                            <CardItem<FoodNotes>
                                key={i}
                                item={item}
                                setItem={setNotes}
                                index={i}
                                isTextArea={isTextArea}
                                title={title}
                            />
                        ))
                    ) : (
                        <p className="text-center italic text-gray-500">
                            No notes found.
                        </p>
                    )
                )}
            </CardContent>
        </Card>
    );
};
