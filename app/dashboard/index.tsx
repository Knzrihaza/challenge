import { useState, type SetStateAction } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Separator } from "~/components/ui/separator"
import { CustomCard } from "~/components/card"
import { allergiesSeverityIndicator, dislikesSeverityIndicator, elder, favoriteCategoryIndicator } from "~/mockData/mockData"
import type { DislikedFood, FavoriteFood, FoodAllergies, FoodItem, FoodNotes } from "~/types/types"


const allergiesPresets = ["Nuts", "Dairy", "Gluten", "Eggs", "Soy"]

export function Dashboard() {

    const [favorites, setFavorites] = useState<FavoriteFood[]>([])
    const [dislikes, setDislikes] = useState<DislikedFood[]>([])
    const [allergies, setAllergies] = useState<FoodAllergies[]>([])
    const [notes, setNotes] = useState<FoodNotes[]>([])

    return (
        <main className="min-h-screen p-6 bg-[#f2f1e3]">
            <div className="max-w-5xl mx-auto space-y-6">
                <Card className="bg-[#fef9f2]">
                    <CardHeader>
                        <div>
                            <CardTitle>{elder.fullName} ({elder.preferredName})</CardTitle>
                        </div>
                        <CardDescription>Age: {elder.age} | Gender: {elder.gender}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-700 space-y-2">
                        <p><strong>Caregiver:</strong> {elder.caregiver}</p>
                        <p><strong>Meal Time Preference:</strong> {elder.mealTime}</p>
                    </CardContent>
                </Card>
                <CustomCard
                    title={"Favorite Foods"}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    selectIndicator={favoriteCategoryIndicator}

                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                    <CustomCard
                        title={"Disliked Foods"}
                        dislikes={dislikes}
                        setDislikes={setDislikes}
                        selectIndicator={dislikesSeverityIndicator}
                    />

                    <CustomCard title={"Allergies"} allergies={allergies} setAllergies={setAllergies} allergiesPresets={allergiesPresets} selectIndicator={allergiesSeverityIndicator} />

                </div>
                <CustomCard title={"Special Notes"} notes={notes} setNotes={setNotes} isTextArea={true} />

                <Separator />


                <div className="flex justify-end gap-2">
                    <Button
                        className="bg-transparent border p-4 border-black"
                        onClick={() => alert("Edit mode coming soon")}
                        variant={"outline"}
                    >
                        Edit Profile
                    </Button>
                    <Button
                        className="p-4"
                        onClick={() => window.print()}
                    >
                        Print Summary
                    </Button>
                </div>
            </div>
        </main>
    )
}
