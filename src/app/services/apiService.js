export const genQuizFrmGemini = async ({ topic, difficulty, numQuestions, textContent }) => {
    
    let prompt = `Generate a multiple-choice quiz.
    Topic: "${topic}".
    Difficulty: "${difficulty}".
    Number of questions: ${numQuestions}.`;

    if (textContent) {
        prompt += `\nGenerate questions specifically from the following text:\n"${textContent}"`;
    }

    prompt += `\nEach question should have 4 options and one correct answer.
    Provide the output as a JSON array of objects. Each object should have:
    - "question" (string)
    - "options" (array of 4 strings)
    - "correctAnswer" (string, the exact text of the correct option).`;

    const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
        }
    };

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("Gemini API key is not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file.");
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}. Details: ${errorData.error.message || JSON.stringify(errorData)}`);
    }

    const result = await response.json();

    if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const jsonText = result.candidates[0].content.parts[0].text;
        const parsedQuiz = JSON.parse(jsonText);

        
        if (Array.isArray(parsedQuiz) && parsedQuiz.every(q => q.question && Array.isArray(q.options) && q.options.length === 4 && q.correctAnswer)) {
            return parsedQuiz; 
        } else {
            console.error("Unexpected AI response format:", parsedQuiz);
            throw new Error("Failed to parse quiz from AI response. The format was incorrect.");
        }
    } else {
        console.error("Empty or malformed AI response:", result);
        throw new Error("No quiz content received from the AI.");
    }
};