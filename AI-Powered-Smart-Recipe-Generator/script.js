const generateBtn = document.getElementById('generate-btn');
const ingredientsInput = document.getElementById('ingredients-input');
const loader = document.getElementById('loader');
const recipeCard = document.getElementById('recipe-card');
const recipeTitle = document.getElementById('recipe-title');
const recipeContent = document.getElementById('recipe-content');

const GEMINI_API_KEY = "AIzaSyBZK3TixBHKSgxu3xbr9AY9Tr4zYKIogNc";

generateBtn.addEventListener('click', async () => {
    const ingredients = ingredientsInput.value.trim();

    if (!ingredients) {
        alert('Please enter some ingredients.');
        return;
    }

    loader.style.display = 'block';
    recipeCard.style.display = 'none';

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Act as a professional chef. Create a simple recipe using these ingredients: ${ingredients}. If needed, you can assume basic pantry items like salt, water, or oil are available. Format the response strictly in HTML format using tags like <p>, <h3>, <ul>, <li>, etc. Do not include markdown or backticks like \`\`\`html.`
                    }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            let recipeText = data.candidates[0].content.parts[0].text;
            
            recipeTitle.innerText = `Custom Recipe for you!`;
            recipeContent.innerHTML = recipeText;
            recipeCard.style.display = 'block';
        } else {
            alert('Failed to generate recipe. Please check your API key or input.');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while fetching the recipe.');
    } finally {
        loader.style.none = 'none';
        loader.style.display = 'none';
    }
});