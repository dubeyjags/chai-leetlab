export const createProblem = async (req, res) => {
    console.log('createProblem called');
    console.log(req.body);
    
}
export const getProblems = async (req, res) => {
    console.log('getProblems called');
    console.log(req.body);
}
export const getProblemById = async (req, res) => {
    console.log('getProblemById called');
    console.log(req.body);
    console.log(req.params.id);
}
export const updateProblem = async (req, res) => {
    console.log('updateProblem called');
    console.log(req.body);
    console.log(req.params.id);
    console.log(req.params.problemId);
}
export const deleteProblem = async (req, res) => {
    console.log('deleteProblem called');
    console.log(req.body);
    console.log(req.params.id);
    console.log(req.params.problemId);
}
