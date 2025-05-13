export const getjudge0LanguageId = (language) => {
    const languageMap = {
        "python3": 34,
        "java": 62,
        "javascript": 63
    };
    return languageMap[language] || null;
}

export const submitBatch = async (submissions) => {
    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, {
        submissions: submissions
    });
    console.log('result submission',data);
    return data;
    
}

export const pollBatchResults = async (tokens) => {
    while (true) {
        const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
            params:{
                tokens: tokens.join(','),
                base64_encoded: false
            }
        });
    }
    const results = data.submissions;

    const isAllDone = results.every((result) => result.status.id !== 1 || result.status.id !== 2);
    if (isAllDone) {
        return results;
    }

    await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for 2 seconds before polling again
    
}