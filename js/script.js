// In questo esercizio, utilizzerai async/await per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
// Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// Estrarre la proprietà userId dalla ricetta
// Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// Restituire la data di nascita dello chef

// Note del docente
// Scrivi la funzione getChefBirthday(id), che deve:
// Essere asincrona (async).
// Utilizzare await per chiamare le API.
// Restituire una Promise con la data di nascita dello chef.
// Gestire gli errori con try/catch
// Esempio di utilizzo
// getChefBirthday(1)
//   .then(birthday => console.log("Data di nascita dello chef:", birthday))
//   .catch(error => console.error("Errore:", error.message));

//   Esempio di output atteso
// Data di nascita dello chef: 1990-06-15


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
        console.log("Data di nascita dello chef:", birthday);
    }catch (error) {
        console.error("Errore:", error.message);
    }
}) ();
