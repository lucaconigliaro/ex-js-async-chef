async function getChefBirthday(id) {
    let recipe;
    try {
        const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);
        recipe = await recipeResponse.json();
    } catch (error) {
        throw new Error(`Errore nella richiesta della ricetta con id ${id}`);
    }

    if (recipe.message) {
        throw new Error(recipe.message);
    }

    let user;
    try {
        const userResponse = await fetch(`https://dummyjson.com/users/${recipe.userId}`);
        user = await userResponse.json();
    } catch (error) {
        throw new Error(`Errore nella richiesta dell'utente con id ${recipe.userId}`);
    }
    
    if (user.message) {
        throw new Error(user.message);
    }
    return user.birthDate
}

(async() => {
    try {
        const birthday = await getChefBirthday(1);
        const formattedBirthday = dayjs(birthday).format("DD-MM-YYYY")
        console.log("Data di nascita dello chef:", formattedBirthday);
    }catch (error) {
        console.error("Errore:", error.message);
    }
}) ();